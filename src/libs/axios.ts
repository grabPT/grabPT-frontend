import axios from 'axios';

// 헤더 없는 요청 인스턴스 (로그인, 회원가입, 실시간요청현황 열람 등 guest용)
export const publicInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10_000, //10
  withCredentials: false, // 쿠키/세션 차단 속성
  validateStatus: (status) => status < 500, // 4xx도 클라이언트에서 처리
});

// https://medium.com/%40velja/token-refresh-with-axios-interceptors-for-a-seamless-authentication-experience-854b06064bde
// 여기서 찾은 권장패턴입니다. 추후 활성화
// 토큰 포함 인스턴스
export const privateInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  //   headers: { 'Content-Type': 'application/json' },
  //   timeout: 10_000,
});

//요청 인터셉터로 토큰 자동 주입
privateInstance.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      request.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => Promise.reject(error),
);

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
