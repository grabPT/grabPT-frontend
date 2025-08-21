import type { getExpertReviewsResult } from '@/features/ExpertMypage/types/getExpertReviews';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export type getExpertReviewsRequestByUserId = {
  userId: number;
  page: number;
  size: number;
};

export type getExpertReviewsResponseByUserId = CommonResponseDto<getExpertReviewsResult>;
