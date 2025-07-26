import { useMutation } from '@tanstack/react-query';
import { postUserSignup } from '@/features/Signup/apis/auth';
import type { SignupResponseDto, ProSignupRequestDto } from '@/features/Signup/types/auth';

export function useProSignup() {
  return useMutation<SignupResponseDto, Error, ProSignupRequestDto>({
    mutationFn: postUserSignup,
  });
}