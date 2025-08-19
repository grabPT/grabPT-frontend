import { useMutation } from '@tanstack/react-query';

import { postPaymentCallback } from '@/features/Contract/apis/postPaymentCallback';
import type { postPaymentCallbackRequestDto } from '@/features/Contract/types/postPaymentCallbackType';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export const usePostPaymentCallback = () =>
  useMutation<CommonResponseDto<string>, Error, postPaymentCallbackRequestDto>({
    mutationFn: (params) => postPaymentCallback(params),
    onSuccess: (data) => {
      return data.result;
    },
    onError: (error) => {
      console.log('결제반영 실패', error);
    },
  });
