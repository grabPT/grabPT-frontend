import { useMutation } from '@tanstack/react-query';

import { postRequest } from '@/features/Request/apis/request';

import type { BasicResponseDto } from '@/types/Common';
import type { RequestRequestDto } from '@/features/Request/types/Request';

export const useRequest = () => {
  return useMutation<BasicResponseDto, Error, RequestRequestDto>({
    mutationFn: postRequest,
  });
};
