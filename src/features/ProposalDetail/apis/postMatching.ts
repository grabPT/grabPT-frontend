import { privateInstance } from '@/libs/axios';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export type postMatchingRequestDto = {
  requestionId: number; // ← undefined 허용하지 않기
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
  const { requestionId, suggestionId } = params;
  const { data } = await privateInstance.post(
    '/matching',
    null, // 바디 없음
    { params: { requestionId, suggestionId } }, // ← 쿼리로 전달
  );
  return data;
};
