import { useMutation } from '@tanstack/react-query';

import { postLogout } from '@/features/Signup/apis/auth';
import type { BasicResponseDto, LogoutDto } from '@/features/Signup/types/Auth';

export const useLogout = () => {
  return useMutation<BasicResponseDto, Error, LogoutDto>({
    mutationFn: postLogout,
  });
};
