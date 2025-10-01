import { useMutation } from '@tanstack/react-query';

import { postReview } from '@/apis/postReview';
import type { postReviewRequestDto } from '@/features/home/types/reviews';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export const usePostReview = () => {
  return useMutation<CommonResponseDto<string>, Error, postReviewRequestDto>({
    mutationFn: (data: postReviewRequestDto) => postReview(data),
    onSuccess: (data) => {
      console.log('리뷰 작성 요청 성공:', data);
    },
    onError: (error) => {
      console.error('리뷰 작성 요청 실패:', error);
    },
  });
};
