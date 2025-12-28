import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';

import { END_POINT } from '@/constants/endPoints';
// 상단: 필요 타입/함수 import (리프레시 API 경로는 프로젝트에 맞게 유지)

import { refreshSession } from '@/utils/refreshSession';

// ---- 동시 리프레시 방지 상태 & 큐 타입 ----
type RetryQueueItem = {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
  config: AxiosRequestConfig;
};

let isRefreshing = false; // 지금 리프레시 중인지
const retryQueue: RetryQueueItem[] = []; // 리프레시 동안 재시도 대기열

// 헤더 없는 요청 인스턴스 (실시간 요청 현황 열람 등 guest용)
export const publicInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10_000, //10
  withCredentials: false, // 쿠키/세션 차단 속성
  // validateStatus: (status) => status < 500, // 4xx도 클라이언트에서 처리 => 할 줄 몰라서 꺼버림 ㅎ
});

// 리프레시 종료 시 큐에 쌓인 원 요청들 일괄 처리
function processQueue(error: any) {
  while (retryQueue.length) {
    const { resolve, reject, config } = retryQueue.shift()!;
    if (error) {
      reject(error);
    } else {
      // 쿠키가 갱신되었으므로 같은 인스턴스로 원요청 재시도 (다음 단계에서 인스턴스 주입)
      privateInstance.request(config).then(resolve).catch(reject);
    }
  }
}

// 공통 응답 인터셉터 부착: 401 처리 + 중복 리프레시 방지 + 큐 재시도
function attachAuthInterceptors(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      console.log('[INTCPT] status=', error.response?.status, 'url=', error.config?.url);
      // 어떤 인스턴스가 실패했는지(쿠키 동반 여부)
      console.log('[INTCPT] withCreds=', instance.defaults.withCredentials);

      // 서버가 에러 본문을 줬다면 같이 확인 (스택/메시지/에러코드 등)
      console.log('[INTCPT] data=', (error.response as any)?.data);

      // 원 요청의 헤더/플래그를 빠르게 확인
      console.log('[INTCPT] original headers=', (error.config || {}).headers);
      console.log(
        '[INTCPT] flags _retry/skipAuth=',
        (error.config as any)?._retry,
        (error.config as any)?.skipAuth,
      );
      const status = error.response?.status;
      const originalRequest = (error.config || {}) as AxiosRequestConfig & {
        _retry?: boolean;
        skipAuth?: boolean;
      };

      // 인증 관련 엔드포인트 또는 skipAuth 요청은 우회
      const url = typeof originalRequest.url === 'string' ? originalRequest.url : '';
      const isAuthEndpoint = END_POINT.AUTH.REGEX.test(url);

      if (status === 401 && !originalRequest?.skipAuth && !isAuthEndpoint) {
        // 동일 요청 무한 루프 방지
        if (originalRequest._retry) {
          return Promise.reject(error);
        }
        originalRequest._retry = true;

        try {
          console.log('[INTCPT] Entered refresh try block');
          // 진행 중 리프레시에 합류, 없으면 새로 시작
          if (!isRefreshing) {
            console.log('[INTCPT] No refresh in progress, starting new refresh');
            isRefreshing = true;
            console.log('[INTCPT] isRefreshing flag set to true');
            refreshSession()
              .then(() => {
                console.log('[INTCPT] refreshSession request initiated');
                console.log('[INTCPT] refreshSession succeeded, processing queue');
                processQueue(null);
              })
              .catch((refreshErr) => {
                console.log('[INTCPT] refreshSession failed:', refreshErr);
                processQueue(refreshErr);
                throw refreshErr;
              })
              .finally(() => {
                console.log('[INTCPT] refreshSession finished, resetting isRefreshing flag');
                isRefreshing = false;
              });
          }

          // 현재 요청을 큐에 등록하고, 리프레시 완료까지 대기
          const retryResult = await new Promise<any>((resolve, reject) => {
            retryQueue.push({ resolve, reject, config: originalRequest });
          });
          return retryResult;
        } catch (refreshErr) {
          // 5xx는 서버 쪽 문제 추적용으로 한 줄 더
          if (status && status >= 500) {
            console.error('[INTCPT] server-error', status, 'url=', url);
          }
          // 리프레시 실패: 세션 종료 처리
          // window.location.href = '/login';
          return Promise.reject(refreshErr);
        }
      }

      if (!error.response) {
        console.warn('[INTCPT] network-like error:', error.message);
        return Promise.reject(error);
      }

      // 위 조건에 해당하지 않는 모든 에러는 그대로 전파하여 호출부가 명확히 처리하도록 함
      return Promise.reject(error);
    },
  );
}

// https://medium.com/%40velja/token-refresh-with-axios-interceptors-for-a-seamless-authentication-experience-854b06064bde
// 여기서 찾은 권장패턴입니다. 추후 활성화
// 토큰 포함 인스턴스
export const privateInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10_000,
  withCredentials: true,
});

//요청 인터셉터로 토큰 자동 주입
const stage = import.meta.env.VITE_STAGE;
console.log('🚧 [Axios Debug] Current Stage:', stage); // 디버깅용 로그

if (stage == 'development' || stage == 'staging') {
  console.log('🚧 [Axios Debug] Development/Staging mode detected. Attaching interceptor.');
  privateInstance.interceptors.request.use(
    (request) => {
      request.withCredentials = false; //개발 환경에서는 withCredentials false
      const accessToken = localStorage.getItem('accessToken');
      console.log('🚧 [Axios Debug] AccessToken found in localStorage:', !!accessToken);
      if (accessToken) {
        request.headers['Authorization'] = `Bearer ${accessToken}`;
        console.log('🚧 [Axios Debug] Authorization header attached.');
      }
      return request;
    },
    (error) => Promise.reject(error),
  );
} else {
  console.log('🚧 [Axios Debug] Production mode (or unknown). Interceptor NOT attached.');
}
// // 응답 인터셉터 - 401일 때 리프레쉬 토큰을 이용하여 액세스 토큰 재발급
// privateInstance.interceptors.response.use(
//   (response) => response, // 정상 응답은 그대로 반환
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;              // 무한 루프 방지
//       try {
//         const refreshToken = localStorage.getItem('refreshToken');
//         // 리프레시 토큰으로 새 액세스 토큰 요청
//         const res = await axios.post('https://your.auth.server/refresh', {
//           refreshToken,
//         });
//         const { accessToken, refreshToken: newRefresh } = res.data;

//         localStorage.setItem('accessToken', accessToken);
//         localStorage.setItem('refreshToken', newRefresh);

//         privateInstance.defaults.headers.common['Authorization'] =
//           `Bearer ${accessToken}`;

//         return privateInstance(originalRequest);     // 원 요청 재시도
//       } catch (refreshErr) {
//         console.error('Token refresh failed:', refreshErr);
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         window.location.href = '/login';           // 로그인 화면으로 이동
//         return Promise.reject(refreshErr);
//       }
//     }
//     return Promise.reject(error);                 // 기타 오류는 그대로
//   },
// );

// 멀티 파트 데이터 사용 시 skipAuth 옵션을 통해 인증 헤더를 생략할 수 있음.(회원가입-생략, 제안서 작성-포함)
declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuth?: boolean;
    _retry?: boolean;
  }
  export interface InternalAxiosRequestConfig {
    skipAuth?: boolean;
    _retry?: boolean;
  }
}

// 파일 업로드 전용 인스턴스 (multipart/form-data)
export const multipartInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  timeout: 10_000,
  withCredentials: true,
});
if (stage == 'development' || stage == 'staging') {
  multipartInstance.interceptors.request.use(
    (request) => {
      request.withCredentials = false; //개발 환경에서는 withCredentials false
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        request.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return request;
    },
    (error) => Promise.reject(error),
  );
}

// attachAuthInterceptors(publicInstance); // 임시: 어떤 인스턴스가 401을 받는지 확인용
attachAuthInterceptors(privateInstance);
attachAuthInterceptors(multipartInstance);

// // 요청 시 토큰 자동 주입
// multipartInstance.interceptors.request.use(
//   (request) => {
//     if (!request.skipAuth) {
//       const accessToken = localStorage.getItem('accessToken');
//       if (accessToken) {
//         request.headers['Authorization'] = `Bearer ${accessToken}`; //헤더에 토큰 넣어줌
//       }
//     }
//     return request;
//   },
//   (error) => Promise.reject(error),
// );

// https://medium.com/%40velja/token-refresh-with-axios-interceptors-for-a-seamless-authentication-experience-854b06064bde
// 여기서 찾은 권장패턴입니다. 추후 활성화
// 토큰 포함 인스턴스
/*
export const privateInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10_000,
  withCredentials: true,
});




// 파일 업로드 전용 인스턴스 (multipart/form-data)
export const multipartInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  timeout: 10_000,
  withCredentials: true,
});

*/
