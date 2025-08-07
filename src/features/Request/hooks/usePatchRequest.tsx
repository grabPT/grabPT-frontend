import { useMutation } from '@tanstack/react-query';


import type { RequestRequestDto, RequestResponseDto } from '@/features/Request/types/Request';
import type { CommonResponseDto } from '@/types/commonResponseDto';
import { patchRequest } from '@/features/Request/apis/request';
type PatchRequestParams = {
  requestionId: number;
  body: RequestRequestDto;
};
export const usePatchRequest = () => {
  return useMutation<CommonResponseDto<RequestResponseDto>, Error, PatchRequestParams>({
    mutationFn: ({ requestionId, body }) => patchRequest(requestionId, body),
    onSuccess: (data) => {
      console.log('요청서 수정 성공:', data);
    },
    onError: (error) => {
      console.error('요청서 수정 실패:', error);
    },
  });
};
