import { useMutation } from '@tanstack/react-query';

import { postSmsVerify } from '@/features/Signup/apis/auth';
import type { SmsVerifyRequestDto } from '@/features/Signup/types/Auth';
import type { BasicResponseDto } from '@/types/Common';

function useSmsVerify() {
  return useMutation<BasicResponseDto, Error, SmsVerifyRequestDto>({
    mutationFn: postSmsVerify,
  });
}

export default useSmsVerify;
