import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteAccount } from '@/apis/deleteAccount';
import type { DeleteAccount } from '@/types/deleteAccount';

export function useDeleteAccount() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (body: DeleteAccount) => deleteAccount(body),
    onMutate: async () => {
      // 탈퇴 과정 중 불필요한 refetch 방지
      await qc.cancelQueries();
    },
    onSuccess: async () => {
      // 1) 사용자 관련 쿼리 제거(선호)
      qc.clear();

      // 2) 인증 스토리지/쿠키 제거
      localStorage.removeItem('sort-storage');
      localStorage.removeItem('suggest-storage');
      localStorage.removeItem('role-storage');
      localStorage.removeItem('alarm-storage');
      localStorage.removeItem('unread-storage');
    },
    onError: (err) => {
      console.error('탈퇴 실패', err);
    },
  });
}
