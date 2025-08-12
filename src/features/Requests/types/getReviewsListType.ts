import type { PageableType } from '@/features/Requests/types/getRequestsListType';
import type { SortType } from '@/types/SortType';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export type getMyReviewsListRequestDto = {
  userId: number;
  page: number;
  size: number;
};

export type getMyReviewsListResultType = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: getMyReviewsListItemType[];
  sort: SortType;
  number: number;
  pageable: PageableType;
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type getMyReviewsListItemType = {
  reviewId: number;
  nickName: string;
  residence: string;
  rating: number;
  content: string;
  center?: string;
  proId?: number;
  proNickName?: string;
  imageURL?: string;
};
export type getMyReviewsListResponseDto = CommonResponseDto<getMyReviewsListResultType>;
