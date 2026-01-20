import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import ROUTES from '@/constants/routes';
import { postLogout } from '@/features/Signup/apis/auth';
import type { LogoutDto } from '@/features/Signup/types/Auth';
import { useRoleStore } from '@/store/useRoleStore';
import type { CommonResponseDto } from '@/types/commonResponseDto';

/**
 * 로그아웃 훅
 * 얘 ㅅㅂ 왜 여깄음 ㅋㅋㅋ
 * 얘 어따 넣어야함? 그냥 새로 만들어야 하나
 */
export const useLogout = () => {
  const resetAuth = useRoleStore((s) => s.resetAuth);
  const navigate = useNavigate();
  return useMutation<CommonResponseDto<string>, Error, LogoutDto>({
    mutationFn: postLogout,
    onSuccess: (data) => {
      // 개발 및 스테이징 환경에서만 로컬 스토리지 정리
      if (
        import.meta.env.VITE_STAGE === 'development' ||
        import.meta.env.VITE_STAGE === 'staging'
      ) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('role-storage');
        localStorage.removeItem('alarm-storage');
        localStorage.removeItem('unread-storage');
      }
      console.log('로그아웃 요청 성공:', data);

      resetAuth();
      //microTask를 통해 role을 먼저 바꾸고 navigate 진행 -> 여기서 role storage만 guest 상태로 재생성
      if (typeof queueMicrotask === 'function') {
        queueMicrotask(() => navigate(ROUTES.HOME.ROOT, { replace: true }));
      } else {
        setTimeout(() => navigate(ROUTES.HOME.ROOT, { replace: true }), 0);
      }
    },
    onError: (error) => {
      console.error('로그아웃 요청 실패:', error);
    },
  });
};
