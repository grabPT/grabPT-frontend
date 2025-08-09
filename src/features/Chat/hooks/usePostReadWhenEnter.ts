import { useMutation } from '@tanstack/react-query';

import { postReadWhenEnter } from '@/features/Chat/apis/postReadWhenEnter';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export const usePostReadWhenEnter = (roomId: number) => {
  return useMutation<CommonResponseDto<string>, Error, number>({
    mutationFn: () => postReadWhenEnter(roomId),
    onSuccess: (data) => {
      console.log('읽음처리 mutate성공', data);
    },
    onError: (error) => {
      console.log('읽음처리 mutate실패', error);
    },
  });
};
