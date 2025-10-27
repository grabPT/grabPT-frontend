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
  profileImageUrl: string;
  userId: number;
  availableDays: string[];
  availableTimes: TimeSlot[];
  categoryName: string;
  requestContent: string;
  content: string; //이거 원래 없었는데 추가함
  address: Address & { specAddress: string }; //Address타입에 specAddress가 없길래 임의적으로 추가함. 다른 건 맞는지 검사해봐야 할 듯...
  // location: string; 제거
  matchingStatus: MatchStatusType;
  proNickname: string;
  proID: number;
  // sessionCount: number; 제거
  isWriteReview: boolean;
};

export type getMyRequestsListResponseDto = CommonResponseDto<getMyRequestsListResultType>;
