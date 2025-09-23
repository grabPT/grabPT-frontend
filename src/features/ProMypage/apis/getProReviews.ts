// 카테고리 상세 페이지에서 불러오는 전문가 목록(위치 기반)
import { END_POINT } from '@/constants/endPoints';
import type {
  getProReviewsRequest,
  getProReviewsResponse,
} from '@/features/ProMypage/types/getProReviews';
import { privateInstance } from '@/libs/axios';

export const getProReviews = async (params: getProReviewsRequest) => {
  try {
    const { data } = await privateInstance.get<getProReviewsResponse>(
      END_POINT.MYPROPAGE.REVIEWS.reviews,
      { params },
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('GET /mypage/pro/reviews 실패');
  }
};
