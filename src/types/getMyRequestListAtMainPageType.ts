import type { PageableType } from '@/features/Requests/types/getRequestsListType';
import type { MatchStatusType } from '@/types/RealtimeMatchingType';
import type { TimeSlot } from '@/types/ReqeustsType';
import type { SortType } from '@/types/SortType';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export type getMyRequestsListAtMainPageResultType = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: MyRequestListAtMainPageItemType[];
  number: number;
  sort: SortType;
  numberOfElements: number;
  pageable: PageableType;
  first: boolean;
  last: boolean;
  empty: boolean;
};
export type MyRequestListAtMainPageItemType = {
  nickname: string;
  profileImageUrl: string;
  city: string;
  district: string;
  street: string;
  zipcode: string;
  specAddress: string;
  etcPurposeContent: string;
  categoryName: string;
  availableDays: string[];
  availableTimes: TimeSlot[];
  sessionCount: number;
  content: string;
  status: MatchStatusType;
  proProfileId: number;
  proNickname: string;
  requestionId: number;
};

export type getMyRequestsListAtMainPageResponseDto =
  CommonResponseDto<getMyRequestsListAtMainPageResultType>;
