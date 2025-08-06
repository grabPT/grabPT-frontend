import type { SuggestRequestDto } from '@/features/ProposalForm/types/ProposalForm';
import { axiosInstance } from '@/features/Signup/apis/axios';
import { privateInstance } from '@/libs/axios';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export const postSuggest = async (body: SuggestRequestDto): Promise<CommonResponseDto<string>> => {
  const { data } = await privateInstance.post('/suggestion', body);
  return data;
};
