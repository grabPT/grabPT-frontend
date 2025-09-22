import type { PageableType } from '@/features/Requests/types/getRequestsListType';
import type { Address } from '@/types/ProProfleType';
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
  requestId: number;
  imageURL: string;
  userId: number;
  location: string;
  availableTimes: TimeSlot[];
  availableDays: string[];
  categoryName: string;
  sessionCount: number;
  requestContent: string;
  userLocation: Address;
  proProfileId: number;
  proNickname: string;
  canWriteReview: boolean;
};

export type getMyRequestsListResponseDto = CommonResponseDto<getMyRequestsListResultType>;
