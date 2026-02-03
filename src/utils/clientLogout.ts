import { useAlarmStore } from '@/store/useAlarmStore';
import { useRoleStore } from '@/store/useRoleStore';
import { useUnreadStore } from '@/store/useUnreadStore';

/**
 * 클라이언트 사이드 로그아웃 처리
 * - LocalStorage / Cookie 정리
 * - Zustand Store 초기화
 */
export const performClientLogout = () => {
  const STAGE = import.meta.env.VITE_STAGE;

  // 1. 토큰 및 세션 정리
  if (STAGE === 'development' || STAGE === 'staging') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  } else {
    // 배포 환경: 쿠키 삭제
    const cookies = ['role', 'userId', 'accessToken', 'refreshToken', 'JSESSIONID'];
    cookies.forEach((cookie) => {
      document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  }

  // 2. 스토어 초기화 (Hook이 아닌 일반 함수에서 접근 가능하도록 getState 사용)
  useRoleStore.getState().resetAuth();
  useAlarmStore.getState().resetAlarmCount();
  useUnreadStore.getState().resetUnreadCount();
};
