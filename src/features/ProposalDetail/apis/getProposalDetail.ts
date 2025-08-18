import type { getProposalDetailResponseDto } from '@/features/ProposalDetail/types/getProposalDetailType';
import { privateInstance } from '@/libs/axios';

// parameter: suggestionId
export const getProposalDetail = async (
  suggestionId: number,
): Promise<getProposalDetailResponseDto> => {
  try {
    const { data } = await privateInstance.get(`/api/suggestion/${suggestionId}`, {
      params: { suggestionId },
    });
    console.log(data);
    return data;
  } catch (e) {
    throw e as Error;
  }
};
