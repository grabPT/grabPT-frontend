import { useMutation } from '@tanstack/react-query';

import { postProSignup } from '@/features/Signup/apis/auth';
import type { BasicResponseDto, ProSignupRequestDto } from '@/features/Signup/types/Auth';

export function useProSignup() {
  return useMutation<BasicResponseDto, Error, ProSignupRequestDto>({
    mutationFn: postProSignup,
  });
}
