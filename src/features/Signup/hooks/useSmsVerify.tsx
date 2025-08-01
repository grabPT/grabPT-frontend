import { useMutation } from '@tanstack/react-query';

import { postSmsVerify } from '@/features/Signup/apis/auth';
import type { BasicResponseDto, SmsVerifyRequestDto } from '@/features/Signup/types/Auth';

function useSmsVerify() {
  return useMutation<BasicResponseDto, Error, SmsVerifyRequestDto>({
    mutationFn: postSmsVerify,
  });
}

export default useSmsVerify;
