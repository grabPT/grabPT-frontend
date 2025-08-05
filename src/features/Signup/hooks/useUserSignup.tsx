import { useMutation } from '@tanstack/react-query';

import { postUserSignup } from '@/features/Signup/apis/auth';
import type { UserSignupRequestDto } from '@/features/Signup/types/Auth';
import type { BasicResponseDto } from '@/types/Common';

export function useUserSignup() {
  return useMutation<BasicResponseDto, Error, UserSignupRequestDto>({
    mutationFn: postUserSignup,
  });
}
