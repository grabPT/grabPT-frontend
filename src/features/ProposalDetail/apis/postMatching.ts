import { privateInstance } from '@/libs/axios';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export type postMatchingRequestDto = {
  requestionId: number; // undefined 허용 ❌
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
  const { data } = await privateInstance.post(
    `/matching?requestionId=${params.requestionId}&suggestionId=${params.suggestionId}`,
    {}, // body는 비워두고
    // { params }, // ← 쿼리 스트링으로 전달
  );
  return data;
};
