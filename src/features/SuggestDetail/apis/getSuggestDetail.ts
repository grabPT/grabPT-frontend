import type { getSuggestDetailResponseDto } from '@/features/SuggestDetail/types/getSuggestDetailType';
import { privateInstance } from '@/libs/axios';

// parameter: suggestionId
export const getSuggestDetail = async (
  suggestionId: number,
): Promise<getSuggestDetailResponseDto> => {
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
