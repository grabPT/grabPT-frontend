import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

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
    onSuccess: () => {
      toast.success('요청서가 성공적으로 수정되었습니다.');
    },
    onError: (error) => {
      console.error('요청서 수정 실패:', error);
      toast.error('요청서 수정에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
