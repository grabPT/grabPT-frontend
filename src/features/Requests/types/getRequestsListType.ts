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
  // pageable: {
  //   offset: number;
  //   sort: SortType;
  //   pageNumber: number;
  //   pageSize: number;
  //   paged: boolean;
  //   unpaged: boolean;
  // };
  pageable: PageableType;
  //위 주석 되어있던거 아래로 바꿨는데 문제 생기면 원래대로 ㄱㄱ
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
