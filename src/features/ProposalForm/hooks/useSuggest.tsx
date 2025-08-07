import { useMutation } from '@tanstack/react-query';

import { postSuggest } from '@/features/ProposalForm/apis/suggest';
import type { SuggestRequestDto } from '@/features/ProposalForm/types/ProposalForm';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export const useSuggest = () => {
  return useMutation<CommonResponseDto<string>, Error, SuggestRequestDto>({
    mutationFn: postSuggest,
    onSuccess: (data) => {
      console.log('제안서 작성 요청 성공:', data);
    },
    onError: (error) => {
      console.error('제안서 작성 요청 실패:', error);
    },
  });
};
