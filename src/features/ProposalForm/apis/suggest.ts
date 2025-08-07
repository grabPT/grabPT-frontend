import type { SuggestRequestDto } from '@/features/ProposalForm/types/ProposalForm';
import { privateInstance } from '@/libs/axios';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export const postSuggest = async (body: SuggestRequestDto): Promise<CommonResponseDto<string>> => {
  const { data } = await privateInstance.post('/api/suggestion', body);
  return data;
};
