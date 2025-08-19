import type { MatchStatusType } from '@/types/RealtimeMatchingType';
import type { TimeSlot } from '@/types/ReqeustsType';
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
  requestId: number;
  availableTimes: TimeSlot[];
  availableDays: string[];
  categoryName: string;
  content: string;
};

export type getRequestsListResultType = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: RequestsListItemType[];
  number: number;
  sort: SortType;
  numberOfElements: number;
  pageable: PageableType;
  first: boolean;
  last: boolean;
  empty: boolean;
};
export type PageableType = {
  offset: number;
  sort: SortType;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
};
export type getRequestsListResponseDto = CommonResponseDto<getRequestsListResultType>;
