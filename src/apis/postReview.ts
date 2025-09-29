import { END_POINT } from '@/constants/endPoints';
import type { postReviewRequestDto } from '@/features/home/types/reviews';
import { privateInstance } from '@/libs/axios';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export const postReview = async (
  body: postReviewRequestDto,
): Promise<CommonResponseDto<string>> => {
  try {
    const { data } = await privateInstance.post(END_POINT.REVIEWS.reviews, body);
    return data;
  } catch (e) {
    console.log(e);
    throw e as Error;
  }
};
