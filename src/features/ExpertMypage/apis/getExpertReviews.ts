// 카테고리 상세 페이지에서 불러오는 전문가 목록(위치 기반)
import { END_POINT } from '@/constants/endPoints';
import type {
  getExpertReviewsRequest,
  getExpertReviewsResponse,
} from '@/features/ExpertMypage/types/getExpertReviews';
import { privateInstance } from '@/libs/axios';

export const getExpertReviews = async (params: getExpertReviewsRequest) => {
  try {
    const { data } = await privateInstance.get<getExpertReviewsResponse>(
      END_POINT.MYPROPAGE.REVIEWS.reviews,
      { params },
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('GET /mypage/pro/reviews 실패');
  }
};
