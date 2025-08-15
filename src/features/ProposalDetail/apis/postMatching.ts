import { privateInstance } from '@/libs/axios';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export type postMatchingRequestDto = {
  requestionId: number | undefined;
  suggestionId: number;
};

export type postMatchingResultType = {
  matchingId: number;
  contractId: number;
};

export type postMatchingResponseDto = CommonResponseDto<postMatchingResultType>;

export const postMatching = async (
  params: postMatchingRequestDto,
): Promise<postMatchingResponseDto> => {
  try {
    const { data } = await privateInstance.post(`/matching`, params);
    return data;
  } catch (e) {
    console.log(e);
    throw e as Error;
  }
};
