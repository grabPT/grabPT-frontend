import { END_POINT } from '@/constants/endPoints';
import { privateInstance } from '@/libs/axios';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export const deleteReview = async (reviewId: number): Promise<CommonResponseDto<string>> => {
  try {
    const { data } = await privateInstance.delete(END_POINT.REVIEWS.delete(reviewId));
    return data;
  } catch (e) {
    console.error(e);
    throw e as Error;
  }
};
