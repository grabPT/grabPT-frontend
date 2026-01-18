import { useMutation } from '@tanstack/react-query';

import { postReadWhenExist } from '@/features/Chat/apis/postReadWhenEnter';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export const usePostReadWhenExist = (roomId: number) => {
  return useMutation<CommonResponseDto<string>, Error, number>({
    mutationFn: () => postReadWhenExist(roomId),
    onError: (error) => {
      console.error(error);
    },
  });
};
