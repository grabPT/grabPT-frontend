import type { MatchStatusType } from '@/types/RealtimeMatchingType';
import type { Role } from '@/types/Role';
import type { SortType } from '@/types/SortType';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export type getContractListRequestDto = {
  role: Role | null;
  userId: number | null;
};

export type getContractListResult = {
  totalActiveContracts: number;
  totalCompletedContracts: number;
  contracts: PageContractListDto;
};

export type PageContractListDto = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: getContractListItem[];
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

export type getContractListItem = {
  userNickname: string;
  profileImageUrl: string;
  matchingStatus: MatchStatusType;
  sessionCount: number;
  contractPrice: number;
  startDate: string;
  expireDate: string;
};

export type getContractListResponseDto = CommonResponseDto<getContractListResult>;
