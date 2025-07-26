import { useMutation } from '@tanstack/react-query';
import { postUserSignup } from '@/features/Signup/apis/auth';
import type { UserSignupRequestDto, SignupResponseDto } from '@/features/Signup/types/auth';

export function useUserSignup() {
  return useMutation<SignupResponseDto, Error, UserSignupRequestDto>({
    mutationFn: postUserSignup,
  });
}