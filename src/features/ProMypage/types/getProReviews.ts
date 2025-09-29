import type { SortType } from '@/types/SortType';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export type getProReviewsRequest = {
  page: number;
  size: number;
};

export type getProReviewsResponse = CommonResponseDto<getProReviewsResult>;
export type getProReviewsResult = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: proReviewList[];
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

export type proReviewList = {
  reviewId: number;
  reviewer: string;
  location: string;
  rating: number;
  content: string;
  reviewee: string;
  revieweeId: number;
  imageURL: string;
  centerName: string;
};
