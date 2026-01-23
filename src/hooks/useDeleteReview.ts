import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteReview } from '@/apis/deleteReview';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation<CommonResponseDto<string>, Error, number>({
    mutationFn: (reviewId: number) => deleteReview(reviewId),
    onSuccess: () => {
      toast.success('리뷰가 삭제되었습니다.');
      // 리뷰 관련 쿼리 모두 무효화
      queryClient.invalidateQueries({ queryKey: ['ProReviews'] });
      queryClient.invalidateQueries({ queryKey: ['ProReviewsByUserId'] });
    },
    onError: (error) => {
      console.error('리뷰 삭제 실패:', error);
      toast.error('리뷰 삭제에 실패했습니다.');
    },
  });
};
