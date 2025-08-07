import type { MatchStatusType } from '@/types/RealtimeMatchingType';
import type { SortByType, SortType } from '@/types/SortType';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export type getRequestsListRequestDto = {
  sortBy: SortByType;
  page: number;
  size: number;
};

export type RequestsListItemType = {
  username: string;
  userStreet: string;
  sessionCount: number;
  price: number;
  status: MatchStatusType;
  userProfileImageUrl: string;
  requstionId: number;
};

export type getRequestsListResultType = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: RequestsListItemType[];
  number: number;
  sort: SortType;
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: SortType;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type getRequestsListResponseDto = CommonResponseDto<getRequestsListResultType>;
