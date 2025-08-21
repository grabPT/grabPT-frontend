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
      localStorage.removeItem('accessToken');
      localStorage.removeItem('role-storage');
      localStorage.removeItem('alarm-storage');
      localStorage.removeItem('unread-storage');
      // HttpOnly 쿠키를 쓰면 서버가 Set-Cookie로 삭제하도록
      // /auth/logout 같은 엔드포인트를 호출하는 것도 안전
    },
    onError: (err) => {
      // 에러 핸들링 UX
      console.error('탈퇴 실패', err);
      // 필요 시 토스트 노출
    },
  });
}
