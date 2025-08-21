import { useMutation } from '@tanstack/react-query';

import { patchRequest } from '@/features/Request/apis/request';
import type { RequestRequestDto, RequestResponseDto } from '@/features/Request/types/Request';
import type { CommonResponseDto } from '@/types/commonResponseDto';

type PatchRequestParams = {
  requestionId: number;
  body: RequestRequestDto;
};
export const usePatchRequest = () => {
  return useMutation<CommonResponseDto<RequestResponseDto>, Error, PatchRequestParams>({
    mutationFn: ({ requestionId, body }) => patchRequest(requestionId, body),
    onSuccess: (data) => {
      console.log('요청서 수정 성공:', data);
      alert('요청서가 성공적으로 수정되었습니다!');
    },
    onError: (error) => {
      console.error('요청서 수정 실패:', error);
    },
  });
};
