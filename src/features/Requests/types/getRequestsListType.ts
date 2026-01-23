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
  userName: string;
  location: string;
  sessionCount: number;
  requestedPrice: number;
  matchingStatus: MatchStatusType;
  profileImageUrl: string;
  requestionId: number;
  content: string;
  etcPurposeContent: string;
  availableDays: string[];
  availableTimes: TimeSlot[];
  categoryName: string;
  userNickname: string;
  // requestLocation: Address[];
  // matchStatus: MatchStatusType; 중복 주석 처리
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
  content?: RequestsListItemProps[];
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
  content?: string;
  profileImageUrl?: string;
  proProfileId?: number;
  proNickname?: string;
  canWriteReview?: boolean;
  requestUserName: string;
  requestUserStreet: string;
  requestSessionCount: number;
  requestPrice: number;
  requestStatus: MatchStatusType;
  photos: string;
  requestRequestId: number;
  requestAvailableTimes: TimeSlot[];
  requestAvailableDays: string[];
  requestCategoryName: string;
  requestContent: string;
  requestUserNickname: string;
  requestLocation: Address[];
  requestEtcPurposeContent: string;
  matchStatus: MatchStatusType;
};
