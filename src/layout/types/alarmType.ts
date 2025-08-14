import type { CommonResponseDto } from '@/types/commonResponseDto';

export type alarmType = {
  id: number;
  userId: number;
  type: 'REQUESTION' | 'SUGGESTION' | 'CONTRACT' | 'MESSAGE';
  title: string;
  content: string;
  redirectUrl: string;
  createdAt: string;
  read: boolean;
};

export type getAlarmListResponseDto = CommonResponseDto<alarmType[]>;

export type postAlarmReadResponseDto = CommonResponseDto<alarmType>;
