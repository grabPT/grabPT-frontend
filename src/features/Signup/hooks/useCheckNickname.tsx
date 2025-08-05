import { useMutation } from '@tanstack/react-query';

import { getCheckNickname } from '@/features/Signup/apis/auth';
import type { BasicResponseDto } from '@/types/Common';

export const useCheckNickname = () => {
  return useMutation<BasicResponseDto, Error, string>({
    mutationFn: (nickname: string) => getCheckNickname(nickname),
  });
};
