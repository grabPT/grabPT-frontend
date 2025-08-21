import { privateInstance } from '@/libs/axios';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export type ReviewForm = {
  content: string;
  proProfileId: number;
  rating: number;
};
export const postReview = async (body: ReviewForm): Promise<CommonResponseDto<string>> => {
  try {
    const { data } = await privateInstance.post(`/reviews`, body);
    return data;
  } catch (e) {
    console.log(e);
    throw e as Error;
  }
};
