import { END_POINT } from '@/constants/endPoints';
import type { getMyInfoListRequestDto } from '@/features/Mypage/types/getMyRequestsListRequestDto';
import type { getMyReviewsListResponseDto } from '@/features/Requests/types/getReviewsListType';
import { privateInstance } from '@/libs/axios';

// parameter: sortBy, page, size
export const getMyReviewsList = async (
  params: getMyInfoListRequestDto,
): Promise<getMyReviewsListResponseDto> => {
  try {
    const { data } = await privateInstance.get(END_POINT.MYPAGE.REVIEWS.reviews, { params });
    return data;
  } catch (e) {
    throw e as Error;
  }
};
