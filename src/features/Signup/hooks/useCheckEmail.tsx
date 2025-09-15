import { useMutation } from '@tanstack/react-query';

import { getEmailCheck } from '@/features/Signup/apis/auth';
import type { EmailCheckResponseDto } from '@/features/Signup/types/Auth';

export const useCheckEmail = () => {
  return useMutation<EmailCheckResponseDto, Error, string>({
    mutationFn: async (email: string) => {
      const res = await getEmailCheck(email);
      return res.result;
    },
    onSuccess: (data) => {
      console.log('이메일 중복 요청 성공:', data);
    },
    onError: (error) => {
      alert('이메일 중복 요청 실패');
      console.log('이메일 중복 처리 로직 실패', error);
    },
  });
};
