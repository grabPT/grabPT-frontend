import type { PageableType } from '@/features/Requests/types/getRequestsListType';
import type { SortType } from '@/types/SortType';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export type getMyRequestsListResultType = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: ContentInfo[];
  number: number;
  sort: SortType;
  numberOfElements: number;
  pageable: PageableType;
  first: boolean;
  last: boolean;
  empty: boolean;
};
export type ContentInfo = {
  nickname: string;
  profileImageUrl: string;
  city: string;
  district: string;
  street: string;
  zipcode: string;
  streetCode: string;
  specAddress: string;
  etcPurposeContent: string;
  categoryName: string;
  availableDays: string[];
  availableTimes: string[];
  content: string;
};

export type getMyRequestsListResponseDto = CommonResponseDto<getMyRequestsListResultType>;
