// src/features/Mypage/hooks/usePatchMyPage.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type MyPagePatchPayload, patchMyPage } from '../apis/patchMypage';

export const USER_INFO_QUERY_KEY = ['userInfo'] as const;

export const usePatchMyPage = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: MyPagePatchPayload) => patchMyPage(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      if (onSuccessCallback) onSuccessCallback();
    },
  });
};
