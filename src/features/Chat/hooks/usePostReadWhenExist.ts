import { useMutation } from '@tanstack/react-query';

import { postReadWhenExist } from '@/features/Chat/apis/postReadWhenEnter';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export const usePostReadWhenExist = (roomId: number) => {
  return useMutation<CommonResponseDto<string>, Error, number>({
    mutationFn: () => postReadWhenExist(roomId),
    onSuccess: (data) => {
      console.log('Exist 읽음처리 mutate성공', data);
    },
    onError: (error) => {
      console.log('Exist 읽음처리 mutate실패', error);
    },
  });
};
