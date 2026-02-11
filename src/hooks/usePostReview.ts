import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { postReview } from '@/apis/postReview';
import type { postReviewRequestDto } from '@/features/home/types/reviews';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export const usePostReview = () => {
  return useMutation<CommonResponseDto<string>, Error, postReviewRequestDto>({
    mutationFn: (data: postReviewRequestDto) => postReview(data),
    onSuccess: () => {
      toast.success('리뷰 작성이 완료되었습니다');
    },
    onError: () => {
      toast.error('리뷰 작성에 실패했습니다');
    },
  });
};
