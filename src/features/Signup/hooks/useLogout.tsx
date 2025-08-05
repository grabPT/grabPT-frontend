import { useMutation } from '@tanstack/react-query';

import { postLogout } from '@/features/Signup/apis/auth';
import type { LogoutDto } from '@/features/Signup/types/Auth';
import type { BasicResponseDto } from '@/types/Common';

export const useLogout = () => {
  return useMutation<BasicResponseDto, Error, LogoutDto>({
    mutationFn: postLogout,
  });
};
