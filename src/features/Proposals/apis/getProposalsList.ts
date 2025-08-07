import { END_POINT } from '@/constants/endPoints';
import type {
  getProposalsListRequestDto,
  getProposalsListResponseDto,
} from '@/features/Proposals/types/getProposalsListType';
import { privateInstance } from '@/libs/axios';

// parameter: page
export const getProposalsList = async (
  params: getProposalsListRequestDto,
): Promise<getProposalsListResponseDto> => {
  try {
    const { data } = await privateInstance.get(END_POINT.PROPOSALS.list, { params });
    return data;
  } catch (e) {
    throw e as Error;
  }
};
