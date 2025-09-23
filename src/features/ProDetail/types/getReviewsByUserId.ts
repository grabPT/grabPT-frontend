import type { getProReviewsResult } from '@/features/ProMypage/types/getProReviews';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export type getProReviewsRequestByUserId = {
  userId: number;
  page: number;
  size: number;
};

export type getProReviewsResponseByUserId = CommonResponseDto<getProReviewsResult>;
