import { useMutation } from '@tanstack/react-query';

import { postRequest } from '@/features/Request/apis/request';
import type { RequestRequestDto } from '@/features/Request/types/Request';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export const useRequest = () => {
  return useMutation<CommonResponseDto<string>, Error, RequestRequestDto>({
    mutationFn: postRequest,
    onSuccess: (data) => {
      console.log('요청서 작성 요청 성공:', data);
    },
    onError: (error) => {
      console.error('요청서 작성 요청 실패:', error);
    },
  });
};
