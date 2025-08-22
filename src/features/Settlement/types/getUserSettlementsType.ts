import type { CommonResponseDto } from '@/types/commonResponseDto';

export type getUserSettlementsRequestDto = {
  page: number;
};

export type getUserSettlementsResultType = {
  totalSpent: number;
  totalOrders: number;
  activeContracts: number;
  payments: {
    totalPages: number;
    totalElements: number;
    size: number;
    content: [
      {
        contractId: number;
        trainerName: string;
        ptCount: number;
        paymentAmount: number;
        paymentDate: number[]; // [year, month, day, hour, minute, second, nanos]
      },
    ];
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageable: {
      offset: number;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      pageNumber: number;
      pageSize: number;
      paged: boolean;
      unpaged: boolean;
    };
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
  };
};

export type getUserSettlementsResponseDto = CommonResponseDto<getUserSettlementsResultType>;
