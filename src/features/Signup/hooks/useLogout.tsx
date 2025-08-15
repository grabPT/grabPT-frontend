import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { postLogout } from '@/features/Signup/apis/auth';
import type { LogoutDto } from '@/features/Signup/types/Auth';
import { useRoleStore } from '@/store/useRoleStore';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export const useLogout = () => {
  const { setRole } = useRoleStore();
  const nav = useNavigate();
  return useMutation<CommonResponseDto<string>, Error, LogoutDto>({
    mutationFn: postLogout,
    onSuccess: (data) => {
      console.log('로그아웃 요청 성공:', data);
      setRole('GUEST');
      nav('/');
    },
    onError: (error) => {
      console.error('로그아웃 요청 실패:', error);
    },
  });
};
