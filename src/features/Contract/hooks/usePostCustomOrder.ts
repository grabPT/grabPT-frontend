import { useMutation } from '@tanstack/react-query';

import { postCustomOrder } from '@/features/Contract/apis/postCustomOrder';
import type { postCustomOrderRequestDto } from '@/features/Contract/types/postCustomOrderType';

export const usePostCustomOrder = () =>
  useMutation<any, Error, postCustomOrderRequestDto>({
    mutationFn: (params) => postCustomOrder(params),
    onSuccess: (data) => {
      console.log('커스텀오더 성공', data);
    },
    onError: (error) => {
      console.log('커스텀오더 실패', error);
    },
  });
