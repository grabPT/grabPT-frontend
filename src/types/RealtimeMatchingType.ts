import type { CommonResponseDto } from '@/types/commonResponseDto';

export type CategoryCodeType =
  | 'health'
  | 'pilates'
  | 'golf'
  | 'tennis'
  | 'swimming'
  | 'boxing'
  | 'badminton'
  | 'running'
  | 'dance'
  | 'pingpong';

export type MatchStatusType = 'MATCHING' | 'MATCHED';

export type RealtimeMatchingType = {
  id: number | null;
  nickname: string;
  region: string;
  sessionCount: number;
  totalPrice: number;
  matchStatus: MatchStatusType;
  profileImageUrl: string | null;
};

export type getRealtimeMatchingResponseDto = CommonResponseDto<RealtimeMatchingType[]>;
