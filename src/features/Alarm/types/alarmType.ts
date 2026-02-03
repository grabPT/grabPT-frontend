import type { CommonResponseDto } from '@/types/commonResponseDto';

export type alarmType = {
  alarmId: number;
  userId: number;
  type: 'REQUESTION' | 'SUGGESTION' | 'CONTRACT' | 'MESSAGE' | 'PAYMENT' | 'SUCCESS';
  title: string;
  content: string;
  redirectUrl: string;
  sentAt: string;
  isRead: boolean;
};

export type getAllAlarmListResultType = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: alarmType[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
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
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type getAllAlarmListRequestDto = {
  page: number;
  size: number;
};

export type getAllAlarmListResponseDto = CommonResponseDto<getAllAlarmListResultType>;

export type getUnreadAlarmListResponseDto = CommonResponseDto<alarmType[]>;

export type postAlarmReadResponseDto = CommonResponseDto<alarmType>;
