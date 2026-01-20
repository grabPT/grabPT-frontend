import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import {
  postFile,
  type postFileRequestDto,
  type postFileResponseDto,
} from '@/features/Chat/apis/postFile';

export const usePostFile = () =>
  useMutation<postFileResponseDto, Error, postFileRequestDto>({
    mutationFn: (vars) => postFile(vars),
    onError: (error) => {
      console.error('파일 업로드 실패', error);
      toast.error('파일 전송에 실패했어요.');
    },
  });
