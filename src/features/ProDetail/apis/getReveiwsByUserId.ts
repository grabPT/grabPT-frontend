import { END_POINT } from '@/constants/endPoints';
import type {
  getProReviewsRequestByUserId,
  getProReviewsResponseByUserId,
} from '@/features/ProDetail/types/getReviewsByUserId';
import { publicInstance } from '@/libs/axios';

export const getReviewsByUserId = async (
  params: getProReviewsRequestByUserId,
): Promise<getProReviewsResponseByUserId> => {
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
