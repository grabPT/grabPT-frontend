import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteReview } from '@/apis/deleteReview';
import { QUERY_KEYS } from '@/constants/queryKeys';

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: number) => deleteReview(reviewId),
    onSuccess: () => {
      toast.success('리뷰가 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.REVIEW.pro });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.REVIEW.proByUserId });
    },
    onError: (error) => {
      console.error('리뷰 삭제 실패:', error);
      toast.error('리뷰 삭제에 실패했습니다.');
    },
  });
};
