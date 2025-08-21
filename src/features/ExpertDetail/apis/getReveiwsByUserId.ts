import { END_POINT } from '@/constants/endPoints';
import type {
  getExpertReviewsRequestByUserId,
  getExpertReviewsResponseByUserId,
} from '@/features/ExpertDetail/types/getReviewsByUserId';
import { publicInstance } from '@/libs/axios';

export const getReviewsByUserId = async (
  params: getExpertReviewsRequestByUserId,
): Promise<getExpertReviewsResponseByUserId> => {
  try {
    const { data } = await publicInstance.get(
      END_POINT.CATEGORY.PROREVIEWS.reviews(params.userId),
      {
        params,
      },
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('GET /reviews/{userId} 실패');
  }
};
