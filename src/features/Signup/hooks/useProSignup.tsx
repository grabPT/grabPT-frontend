import { useMutation } from '@tanstack/react-query';

import { postProSignup } from '@/features/Signup/apis/auth';
import type { ProSignupRequestDto } from '@/features/Signup/types/Auth';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export function useProSignup() {
  return useMutation<CommonResponseDto<string>, Error, ProSignupRequestDto>({
    mutationFn: postProSignup,
    onSuccess: (data) => {
      console.log('전문가 회원가입 요청 성공:', data);
    },
    onError: (error) => {
      console.error('전문가 회원가입 요청 실패:', error);
    },
  });
}
