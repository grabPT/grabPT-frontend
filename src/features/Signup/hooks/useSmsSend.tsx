import { type UseMutationResult, useMutation } from '@tanstack/react-query';

import { postSmsSend } from '@/features/Signup/apis/auth';
import type { SmsSendRequestDto } from '@/features/Signup/types/Auth';
import type { BasicResponseDto } from '@/types/Common';

function useSmsSend(): UseMutationResult<BasicResponseDto, Error, SmsSendRequestDto> {
  return useMutation<BasicResponseDto, Error, SmsSendRequestDto>({
    mutationFn: postSmsSend,
  });
}

export default useSmsSend;
