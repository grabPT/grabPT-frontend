import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { postPaymentCallback } from '@/features/Contract/apis/postPaymentCallback';
import type { postPaymentCallbackRequestDto } from '@/features/Contract/types/postPaymentCallbackType';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export const usePostPaymentCallback = () => {
  const queryClient = useQueryClient();

  return useMutation<CommonResponseDto<string>, Error, postPaymentCallbackRequestDto>({
    mutationFn: (params) => postPaymentCallback(params),
    onSuccess: async (data) => {
      // 결제 후 정산 내역 업데이트
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.settlementList(1) });
      return data.result;
    },
    onError: (error) => {
      console.log('결제반영 실패', error);
    },
  });
};
