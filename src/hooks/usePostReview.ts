import { useMutation } from '@tanstack/react-query';

import { postReview } from '@/apis/postReview';
import type { postReviewRequestDto } from '@/features/home/types/reviews';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export const usePostReview = () => {
  return useMutation<CommonResponseDto<string>, Error, postReviewRequestDto>({
    mutationFn: (data: postReviewRequestDto) => postReview(data),
    onError: (err) => {
      console.error('리뷰 작성에 실패했습니다', err);
    },
  });
};
