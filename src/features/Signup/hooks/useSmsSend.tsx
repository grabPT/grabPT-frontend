import { type UseMutationResult, useMutation } from '@tanstack/react-query';

import { postSmsSend } from '@/features/Signup/apis/auth';
import type { SmsSendRequestDto } from '@/features/Signup/types/Auth';
import type { CommonResponseDto } from '@/types/commonResponseDto';

function useSmsSend(): UseMutationResult<CommonResponseDto, Error, SmsSendRequestDto> {
  return useMutation<CommonResponseDto, Error, SmsSendRequestDto>({
    mutationFn: postSmsSend,
    onSuccess: (data) => {
      console.log('인증번호 전송 요청 성공:', data);
    },
    onError: (error) => {
      console.error('인증번호 전송 요청 실패', error);
    },
  });
}

export default useSmsSend;
