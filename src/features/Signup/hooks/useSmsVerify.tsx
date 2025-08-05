import { useMutation } from '@tanstack/react-query';

import { postSmsVerify } from '@/features/Signup/apis/auth';
import type { SmsVerifyRequestDto } from '@/features/Signup/types/Auth';
import type { CommonResponseDto } from '@/types/commonResponseDto';

function useSmsVerify() {
  return useMutation<CommonResponseDto<string>, Error, SmsVerifyRequestDto>({
    mutationFn: postSmsVerify,
    onSuccess: (data) => {
      console.log('인증번호 검증 요청 성공:', data);
    },
    onError: (error) => {
      console.error('인증번호 검증 요청 실패:', error);
    },
  });
}

export default useSmsVerify;
