import { useMutation } from '@tanstack/react-query';

import { type ReviewForm, postReview } from '@/apis/postReview';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export const usePostReview = () => {
  return useMutation<CommonResponseDto<string>, Error, ReviewForm>({
    mutationFn: (data: ReviewForm) => postReview(data),
    onSuccess: (data) => {
      console.log('리뷰 작성 요청 성공:', data);
    },
    onError: (error) => {
      console.error('리뷰 작성 요청 실패:', error);
    },
  });
};
