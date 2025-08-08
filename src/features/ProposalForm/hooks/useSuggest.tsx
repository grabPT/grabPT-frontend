import { useMutation } from '@tanstack/react-query';

import { postSuggest } from '@/features/ProposalForm/apis/suggest';
import type { SuggestRequestDto, SuggestResponseDto } from '@/features/ProposalForm/types/Suggest';
import type { CommonResponseDto } from '@/types/commonResponseDto';

type SuggestVariables = {
  data: SuggestRequestDto;
  photos: File[];
};

export const useSuggest = () => {
  return useMutation<CommonResponseDto<SuggestResponseDto>, Error, SuggestVariables>({
    mutationFn: ({ data, photos }) => postSuggest(data, photos),
    onSuccess: (data) => {
      console.log('제안서 작성 요청 성공:', data);
    },
    onError: (error) => {
      console.error('제안서 작성 요청 실패:', error);
    },
  });
};
