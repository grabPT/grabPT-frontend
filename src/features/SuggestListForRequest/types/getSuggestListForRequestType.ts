import type { SortType } from '@/types/SortType';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export type getSuggestListForRequestRequestDto = {
  requestionId: number;
  page: number;
};

export type suggestListForRequestItemType = {
  suggestUserNickname: string;
  suggestCenter: string;
  suggestAddress: string;
  suggestPrice: number;
  suggestAverageRate: number;
  suggestSessionCount: number;
  photos: string;
  suggestSuggestionId: number;
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
