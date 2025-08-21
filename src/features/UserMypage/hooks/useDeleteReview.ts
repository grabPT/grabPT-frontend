import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteReview } from '@/features/UserMypage/apis/deleteReview';

export function useDeleteReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (requestionId: number) => deleteReview(requestionId),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['MyReqeustsList'] });
    },
    onError: (err) => {
      console.error('요청서 삭제 실패', err);
    },
  });
}
