import type { SortType } from '@/types/SortType';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export type getProposalsForRequestRequestDto = {
  requestionId: number;
  page: number;
};

export type proposalsForRequestItemType = {
  suggestUserNickname: string;
  suggestCenter: string;
  suggestAddress: string;
  suggestPrice: number;
  suggestAverageRate: number;
  suggestSessionCount: number;
  photos: string;
  suggestSuggestionId: number;
};

export type getProposalsForRequestResultType = {
  content: proposalsForRequestItemType[];
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

export type getProposalsForRequestResponseDto = CommonResponseDto<getProposalsForRequestResultType>;
