import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { type MyPagePatchPayload, patchMyPage } from '../apis/patchMypage';

export const USER_INFO_QUERY_KEY = ['userInfo'] as const;

export const usePatchMyPage = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: MyPagePatchPayload) => patchMyPage(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      if (onSuccessCallback) onSuccessCallback();
      toast.success('프로필 수정이 완료되었습니다.');
    },
    onError: (error) => {
      console.error('프로필 수정 실패', error);
      toast.error('프로필 수정에 실패했습니다.');
    },
  });
};
