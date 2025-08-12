import { useMutation } from '@tanstack/react-query';

import {
  postFile,
  type postFileRequestDto,
  type postFileResponseDto,
} from '@/features/Chat/apis/postFile';

export const usePostFile = () =>
  useMutation<postFileResponseDto, Error, postFileRequestDto>({
    mutationFn: (vars) => postFile(vars),
    onSuccess: (data) => {
      console.log('파일 업로드 성공', data);
    },
    onError: (error) => {
      console.log('파일 업로드 실패', error);
    },
  });
