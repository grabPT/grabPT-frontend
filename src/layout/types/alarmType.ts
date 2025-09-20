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

export type getAlarmListResponseDto = CommonResponseDto<alarmType[]>;

export type postAlarmReadResponseDto = CommonResponseDto<alarmType>;
