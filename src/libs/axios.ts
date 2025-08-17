// import ROUTES from '@/constants/routes';
// import { postReissue } from '@/features/Signup/apis/auth';
import axios from 'axios';

// 헤더 없는 요청 인스턴스 (로그인, 회원가입, 실시간요청현황 열람 등 guest용)
export const publicInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10_000, //10
  withCredentials: false, // 쿠키/세션 차단 속성
  // validateStatus: (status) => status < 500, // 4xx도 클라이언트에서 처리 => 할 줄 몰라서 꺼버림 ㅎ
});

// https://medium.com/%40velja/token-refresh-with-axios-interceptors-for-a-seamless-authentication-experience-854b06064bde
// 여기서 찾은 권장패턴입니다. 추후 활성화
// 토큰 포함 인스턴스
export const privateInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10_000,
  withCredentials: true,
});

// //요청 인터셉터로 토큰 자동 주입
// privateInstance.interceptors.request.use(
//   (request) => {
//     const accessToken = localStorage.getItem('accessToken');
//     if (accessToken) {
//       request.headers['Authorization'] = `Bearer ${accessToken}`;
//     }
//     return request;
//   },
//   (error) => Promise.reject(error),
// );

// 응답 인터셉터 - 401일 때 리프레쉬 토큰을 이용하여 액세스 토큰 재발급
// privateInstance.interceptors.response.use(
//   (response) => response, // 정상 응답은 그대로 반환
//   async (error) => {
//     const originalRequest = error.config as any;
//     if (
//       error?.response?.status === 401 &&
//       !originalRequest?._retry &&
//       !originalRequest?.skipAuth
//     ) {
//       originalRequest._retry = true; // 무한 루프 방지
//       try {
//         await postReissue();
//         // After refresh, cookies are updated; retry the original request
//         return privateInstance(originalRequest);
//       } catch (refreshErr) {
//         // On refresh failure, redirect to login (cookies are httpOnly; nothing to clear here)
//         window.location.href = ROUTES.AUTH.LOGIN;
//         return Promise.reject(refreshErr);
//       }
//     }
//     return Promise.reject(error);
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

// multipartInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config as any;
//     if (
//       error?.response?.status === 401 &&
//       !originalRequest?._retry &&
//       !originalRequest?.skipAuth
//     ) {
//       originalRequest._retry = true;
//       try {
//         await postReissue();
//         return multipartInstance(originalRequest);
//       } catch (refreshErr) {
//         window.location.href = ROUTES.AUTH.LOGIN
//         return Promise.reject(refreshErr);
//       }
//     }
//     return Promise.reject(error);
//   },
// );

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
