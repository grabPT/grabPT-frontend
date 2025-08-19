import type { CommonResponseDto } from '@/types/commonResponseDto';

export type alarmType = {
  id: number;
  userId: number;
  type: 'REQUESTION' | 'SUGGESTION' | 'CONTRACT' | 'MESSAGE' | 'PAYMENT' | 'SUCCESS';
  title: string;
  content: string;
  redirectUrl: string;
  sendAt: string;
  read: boolean;
};

export type getAlarmListResponseDto = CommonResponseDto<alarmType[]>;

export type postAlarmReadResponseDto = CommonResponseDto<alarmType>;
