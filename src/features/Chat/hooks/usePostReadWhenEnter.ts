import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { postReadWhenEnter } from '@/features/Chat/apis/postReadWhenEnter';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export const usePostReadWhenEnter = (roomId: number) => {
  return useMutation<CommonResponseDto<string>, Error, number>({
    mutationFn: () => postReadWhenEnter(roomId),
    onError: (error) => {
      toast.error('네트워크를 확인해주세요.');
      console.error('읽음처리 mutate실패', error);
    },
  });
};
