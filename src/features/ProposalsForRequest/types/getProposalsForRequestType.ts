import type { SortType } from '@/types/SortType';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export type getProposalsForRequestRequestDto = {
  requestionId: number;
  page: number;
};

export type proposalsForRequestItemType = {
  nickname: string;
  center: string;
  address: string;
  price: number;
  averageRate: number;
  sessionCount: number;
  profileImageUrl: string;
  suggestionId: number;
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
