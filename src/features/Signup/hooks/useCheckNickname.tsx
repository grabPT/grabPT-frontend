import { useMutation } from '@tanstack/react-query';

import { getCheckNickname } from '@/features/Signup/apis/auth';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export const useCheckNickname = () => {
  return useMutation<CommonResponseDto<boolean>, Error, string>({
    mutationFn: (nickname: string) => getCheckNickname(nickname),
    onSuccess: (data) => {
      console.log('닉네임 중복 요청 성공:', data);
    },
    onError: (error) => {
      alert('닉네임 중복 요청 실패');
      console.log('닉네임 중복 처리 로직 실패', error);
    },
  });
};
