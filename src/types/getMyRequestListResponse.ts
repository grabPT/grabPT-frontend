import type { PageableType } from '@/features/Requests/types/getRequestsListType';
import type { Address } from '@/types/ProProfleType';
import type { MatchStatusType } from '@/types/RealtimeMatchingType';
import type { TimeSlot } from '@/types/ReqeustsType';
import type { SortType } from '@/types/SortType';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export type getMyRequestsListResultType = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: MyRequestListItemType[];
  number: number;
  sort: SortType;
  numberOfElements: number;
  pageable: PageableType;
  first: boolean;
  last: boolean;
  empty: boolean;
};
export type MyRequestListItemType = {
  requestionId: number;
  profileImageURL: string;
  userId: number;
  availableDays: string[];
  availableTimes: TimeSlot[];
  categoryName: string;
  content: string;
  address: Address & { specAddress: string };
  matchingStatus: MatchStatusType;
  proNickname: string | null;
  proId: number | null;
  sessionCount: number;
  isWriteReview: boolean;
};

export type getMyRequestsListResponseDto = CommonResponseDto<getMyRequestsListResultType>;
