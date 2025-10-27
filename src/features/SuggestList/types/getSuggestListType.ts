import type { MatchStatusType } from '@/types/RealtimeMatchingType';
import type { SortType } from '@/types/SortType';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export type getSuggestListRequestDto = {
  page: number;
};

export type suggestListItemtype = {
  userNickname: string;
  suggestedPrice: number;
  sessionCount: number;
  matchingStatus: MatchStatusType;
  profileImageUrl: string;
  requestionId: number;
  suggestionId: number;
};

export type getSuggestListResulttype = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: suggestListItemtype[];
  number: number;
  sort: SortType;
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: SortType;
    paged: boolean;
    unpaged: boolean;
    pageNumber: number;
    pageSize: number;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type getSuggestListResponseDto = CommonResponseDto<getSuggestListResulttype>;
