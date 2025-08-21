import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteRequest } from '@/features/UserMypage/apis/deleteRequest';

export function useDeleteRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (requestionId: number) => deleteRequest(requestionId),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['MyRequestsList'] });
    },
    onError: (err) => {
      console.error('요청서 삭제 실패', err);
    },
  });
}
