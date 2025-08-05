import { useMutation } from '@tanstack/react-query';

import { postProSignup } from '@/features/Signup/apis/auth';
import type { ProSignupRequestDto } from '@/features/Signup/types/Auth';
import type { BasicResponseDto } from '@/types/Common';

export function useProSignup() {
  return useMutation<BasicResponseDto, Error, ProSignupRequestDto>({
    mutationFn: postProSignup,
  });
}
