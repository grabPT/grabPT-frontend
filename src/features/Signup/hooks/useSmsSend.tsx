import { type UseMutationResult, useMutation } from '@tanstack/react-query';

import { postSmsSend } from '@/features/Signup/apis/auth';
import type { BasicResponseDto, SmsSendRequestDto } from '@/features/Signup/types/Auth';

function useSmsSend(): UseMutationResult<BasicResponseDto, Error, SmsSendRequestDto> {
  return useMutation<BasicResponseDto, Error, SmsSendRequestDto>({
    mutationFn: postSmsSend,
  });
}

export default useSmsSend;
