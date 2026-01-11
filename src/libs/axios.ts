import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';

import { END_POINT } from '@/constants/endPoints';
import { postReissue } from '@/features/Signup/apis/auth';

// --------------------------------------------------------------------------
// 1. 타입 확장 & 설정 (Types & Config)
// --------------------------------------------------------------------------
const STAGE = import.meta.env.VITE_STAGE;

// Axios 요청 설정에 커스텀 플래그 추가
declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuth?: boolean; // 토큰 검사 건너뛰기
    _retry?: boolean; // 재시도 여부 확인
  }
  export interface InternalAxiosRequestConfig {
    skipAuth?: boolean;
    _retry?: boolean;
  }
}

// --------------------------------------------------------------------------
// 2. Axios 인스턴스 생성 (Instances)
// --------------------------------------------------------------------------

// [Public] 토큰 없이 나가는 요청 (로그인, 조회 등)
export const publicInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10_000,
  withCredentials: false,
});

// [Private] 액세스 토큰이 필요한 요청 (일반 JSON)
export const privateInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10_000,
  withCredentials: true, // 배포 환경: 쿠키 사용, 개발환경 밑에서 꺼줌
});

// [Multipart] 파일 업로드 전용
export const multipartInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  timeout: 10_000,
  withCredentials: true, // 배포 환경: 쿠키 사용
});

// --------------------------------------------------------------------------
// 3. [요청 인터셉터] 토큰 주입 로직 함수 정의 (Request Interceptors)
// 개발/스테이징 환경에서는 헤더에 토큰을 직접 넣어줍니다.
// --------------------------------------------------------------------------
function attachTokenInterceptor(instance: AxiosInstance) {
  if (STAGE === 'development' || STAGE === 'staging') {
    instance.interceptors.request.use(
      (config) => {
        // 개발 환경은 쿠키 대신 헤더 사용하므로 withCredentials 끔
        config.withCredentials = false;

        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
  }
}

// --------------------------------------------------------------------------
// 4. [응답 인터셉터] 토큰 갱신 로직 함수 정의 (Response Interceptors)
// 401 에러 발생 시 Queue에 날리던 함수 다 넣고
// 갱신 성공 시 대기 중인 요청들 재시도, 실패 시 에러 반환
// --------------------------------------------------------------------------

// 재시도 큐 타입 정의
type RetryQueueItem = {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
  config: AxiosRequestConfig;
};

// 갱신 상태 관리 (Mutex 역할)
let isRefreshing = false;
const retryQueue: RetryQueueItem[] = [];

// 큐 처리 함수: 갱신 성공 시 대기 중인 요청들 재시도, 실패 시 에러 반환
function processQueue(error: any) {
  while (retryQueue.length > 0) {
    const { resolve, reject, config } = retryQueue.shift()!;
    if (error) {
      reject(error);
    } else {
      // 갱신된 토큰(또는 쿠키)으로 원본 요청 재시도
      privateInstance.request(config).then(resolve).catch(reject);
    }
  }
}

// 인터셉터 부착 함수
function attachAuthInterceptor(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (response) => response, // 성공 시 그대로 통과
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig;
      const status = error.response?.status;

      // 예외 조건: 요청 자체가 없거나, 이미 재시도했거나, skipAuth 옵션이 있거나
      if (!originalRequest || originalRequest._retry || originalRequest.skipAuth) {
        return Promise.reject(error);
      }

      // 401 에러가 아니거나, Auth 관련 API(로그인 등)면 갱신 로직 타지 않음
      const url = originalRequest.url || '';
      if (status !== 401 || END_POINT.AUTH.REGEX.test(url)) {
        return Promise.reject(error);
      }

      // --- [여기부터 401 핸들링 시작] ---
      originalRequest._retry = true; // 재시도 플래그 설정 (무한루프 방지)

      try {
        // 1. 이미 다른 요청이 갱신 중이라면? -> 큐에 넣고 대기
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            retryQueue.push({ resolve, reject, config: originalRequest });
          });
        }

        // 2. 내가 첫 401이라면? -> 갱신 시작 (Flag On)
        isRefreshing = true;

        // 3. 토큰 갱신 요청
        const { result } = await postReissue();

        // 개발/스테이징 환경: 응답 받은 토큰 스토리지 갱신
        if (STAGE === 'development' || STAGE === 'staging') {
          if (result) {
            localStorage.setItem('accessToken', result.accessToken);
            localStorage.setItem('refreshToken', result.refreshToken);
          }
        }

        // 4. 갱신 성공! -> 큐에 쌓인 요청들 처리
        processQueue(null);

        // 5. 내 요청(첫 401)도 재시도
        return privateInstance(originalRequest);
      } catch (refreshError) {
        // 6. 갱신 실패! -> 큐에 쌓인 요청들 전부 에러 처리
        processQueue(refreshError);
        // 필요 시 여기서 로그아웃 처리 가능
        return Promise.reject(refreshError);
      } finally {
        // 7. 상태 초기화 (Flag Off)
        isRefreshing = false;
      }
    },
  );
}

// --------------------------------------------------------------------------
// 5. 초기화 (Initialization)
// 정의한 인터셉터들을 실제 인스턴스에 장착합니다.
// --------------------------------------------------------------------------

// 1) 토큰 주입 (Request) - 개발환경에서만 작동
attachTokenInterceptor(privateInstance);
attachTokenInterceptor(multipartInstance);

// 2) 토큰 갱신 (Response) - 401 처리
attachAuthInterceptor(privateInstance);
attachAuthInterceptor(multipartInstance);
