import { END_POINT } from '@/constants/endPoints';
import type {
  getProposalsForRequestRequestDto,
  getProposalsForRequestResponseDto,
} from '@/features/ProposalsForRequest/types/getProposalsForRequestType';
import { privateInstance } from '@/libs/axios';

// parameter: requestionId, page
export const getProposalsForRequest = async (
  params: getProposalsForRequestRequestDto,
): Promise<getProposalsForRequestResponseDto> => {
  try {
    const { data } = await privateInstance.get(
      END_POINT.REQUESTS.PROPOSALS_FOR_REQUESTS(params.requestionId),
      { params },
    );
    console.log('ㅇㅇ');
    return data;
  } catch (e) {
    throw e as Error;
  }
};
