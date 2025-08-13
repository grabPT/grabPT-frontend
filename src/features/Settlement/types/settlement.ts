import type { SortType } from '@/types/SortType';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export type getSettlementListResult = {
  totalEarnings: number;
  totalOrders: number;
  activeClients: number;
  memberPayments: PageMemberPaymentDto;
};

export type PageMemberPaymentDto = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: SettlementListItem[];
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

export type SettlementListItem = {
  memberName: string;
  ptCount: number;
  paymentAmount: number;
  earnedAmount: number;
  paymentDate: string;
};
export type getSettlementListResponse = CommonResponseDto<getSettlementListResult>;
