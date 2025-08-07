import { useMutation } from '@tanstack/react-query';

import { postUserSignup } from '@/features/Signup/apis/auth';
import type { UserSignupRequestDto } from '@/features/Signup/types/Auth';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export function useUserSignup() {
  return useMutation<CommonResponseDto<string>, Error, UserSignupRequestDto>({
    mutationFn: postUserSignup,
    onSuccess: (data) => {
      console.log('일반 회원가입 요청 성공:', data);
    },
    onError: (error) => {
      console.error('일반 회원가입 요청 실패:', error);
    },
  });
}
