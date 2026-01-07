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
 */
export const useLogout = () => {
  const resetAuth = useRoleStore((s) => s.resetAuth);
  const navigate = useNavigate();
  return useMutation<CommonResponseDto<string>, Error, LogoutDto>({
    mutationFn: postLogout,
    // todo: 로컬환경에서 localStorage에서 토큰 removeItem해야 함. onSuccess에 추가
    onSuccess: (data) => {
      console.log('로그아웃 요청 성공:', data);
      resetAuth();
      //microTask를 통해 role을 먼저 바꾸고 navigate 진행
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
