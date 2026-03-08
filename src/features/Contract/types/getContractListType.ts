import type { PaymentStatusType } from '@/types/PaymentStatusType';
import type { Role } from '@/types/Role';
import type { SortType } from '@/types/SortType';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export type getContractListRequestDto = {
  role: Role | null;
  userId: number | null;
  paymentStatus?: PaymentStatusType;
  page: number;
  size: number;
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
  contractId: number;
  userNickname: string;
  profileImageUrl: string;
  paymentStatus: PaymentStatusType;
  sessionCount: number;
  contractPrice: number;
  startDate: string;
  expireDate: string;
};

export type getContractListResponseDto = CommonResponseDto<getContractListResult>;
