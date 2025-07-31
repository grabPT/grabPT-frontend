import { useMutation } from '@tanstack/react-query';

import { postUserSignup } from '@/features/Signup/apis/auth';
import type { BasicResponseDto, UserSignupRequestDto } from '@/features/Signup/types/Auth';

export function useUserSignup() {
  return useMutation<BasicResponseDto, Error, UserSignupRequestDto>({
    mutationFn: postUserSignup,
  });
}
