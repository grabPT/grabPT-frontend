import { useMutation } from '@tanstack/react-query';

import { postCustomOrder } from '@/features/Contract/apis/postCustomOrder';
import type {
  postCustomOrderRequestDto,
  postCustomOrderResponseDto,
} from '@/features/Contract/types/postCustomOrderType';

export const usePostCustomOrder = () =>
  useMutation<postCustomOrderResponseDto, Error, postCustomOrderRequestDto>({
    mutationFn: (params) => postCustomOrder(params),
    onSuccess: (data) => {
      return data.result;
    },
    onError: (error) => {
      console.log('커스텀오더 실패', error);
    },
  });
