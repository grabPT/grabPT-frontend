import { useMutation } from '@tanstack/react-query';

import {
  postMatching,
  type postMatchingRequestDto,
  type postMatchingResponseDto,
} from '@/features/ProposalDetail/apis/postMatching';

export const usePostMatching = (params: postMatchingRequestDto) => {
  return useMutation<postMatchingResponseDto, Error, void>({
    mutationFn: () => postMatching(params),
    onSuccess: (data) => {
      console.log('matching mutate성공', data);
    },
    onError: (error) => {
      console.log('matching mutate실패', error);
    },
  });
};
