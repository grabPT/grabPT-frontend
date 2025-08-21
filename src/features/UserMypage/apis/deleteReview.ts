import { privateInstance } from '@/libs/axios';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export const deleteReview = async (requestionId: number): Promise<CommonResponseDto<string>> => {
  try {
    const { data } = await privateInstance.delete<CommonResponseDto<string>>('api/requestion/', {
      params: requestionId,
    });
    return data;
  } catch (e) {
    console.log(e);
    throw e as Error;
  }
};
