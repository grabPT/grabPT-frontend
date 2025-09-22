import type { SortType } from '@/types/SortType';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export type getExpertReviewsRequest = {
  page: number;
  size: number;
};

export type getExpertReviewsResponse = CommonResponseDto<getExpertReviewsResult>;
export type getExpertReviewsResult = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: expertReviewList[];
  number: number;
  sort: SortType;
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: SortType;
    paged: boolean;
    unpaged: boolean;
    pageNumber: number;
    pageSize: number;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type expertReviewList = {
  reviewId: number;
  reviewer: string;
  residence: string;
  rating: number;
  content: string;
  reviewee: string;
  revieweeId: number;
  imageURL: string;
};
