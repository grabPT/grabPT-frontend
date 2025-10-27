import type { SortType } from '@/types/SortType';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export type getSuggestListForRequestRequestDto = {
  requestionId: number;
  page: number;
};

export type suggestListForRequestItemType = {
  userNickname: string;
  centerName: string;
  location: string;
  suggestedPrice: number;
  averageRating: number;
  sessionCount: number;
  profileImageUrl: string;
  suggestionId: number;
};

export type getSuggestListForRequestResultType = {
  content: suggestListForRequestItemType[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: SortType;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: SortType;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
};

export type getSuggestListForRequestResponseDto =
  CommonResponseDto<getSuggestListForRequestResultType>;
