import { useMutation } from '@tanstack/react-query';

import {
  postMatching,
  type postMatchingRequestDto,
  type postMatchingResponseDto,
} from '@/features/SuggestDetail/apis/postMatching';

export const usePostMatching = () => {
  return useMutation<postMatchingResponseDto, Error, postMatchingRequestDto>({
    mutationFn: postMatching,
    onSuccess: (data) => {
      console.log('matching mutate성공', data);
    },
    onError: (error) => {
      console.log('matching mutate실패', error);
    },
  });
};
