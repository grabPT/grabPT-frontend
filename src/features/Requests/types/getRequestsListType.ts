import type { Address } from '@/types/ProProfleType';
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
  nickname: string;
  address: Address[];
  matchStatus: MatchStatusType;
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

//메인 페이지에 일반/전문가 RequestSlider에 값들을 띄우기 위해 만든 타입
export type RequestsListResultType = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: RequestsListItemProps[];
  number: number;
  sort: SortType;
  numberOfElements: number;
  pageable: PageableType;
  first: boolean;
  last: boolean;
  empty: boolean;
};
export type RequestsListItemProps = {
  username?: string;
  userStreet?: string;
  price?: number;
  status?: MatchStatusType;
  userProfileImageUrl?: string;
  nickname?: string;
  address?: Address[];
  requestId: number;
  imageURL?: string;
  userId?: number;
  location?: string;
  availableTimes: TimeSlot[];
  availableDays: string[];
  categoryName: string;
  sessionCount?: number;
  content: string;
  profileImageUrl?: string;
  proProfileId?: number;
  proNickname?: string;
  canWriteReview?: boolean;
};
