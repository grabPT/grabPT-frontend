import { useMutation } from '@tanstack/react-query';

import { postContractPdf } from '@/features/Contract/apis/postContractPdf';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export const usePostContractPdf = () =>
  useMutation<CommonResponseDto<string>, Error, number>({
    mutationFn: (contractId) => postContractPdf(contractId),
    onSuccess: (data) => {
      console.log('계약서 생성 성공', data);
    },
    onError: (error) => {
      console.log('계약서 생성 실패', error);
    },
  });
