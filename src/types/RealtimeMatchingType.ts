import type { CommonResponseDto } from '@/types/commonResponseDto';

export type MatchStatusType = 'MATCHING' | 'MATCHED';

export type RealtimeMatchingType = {
  requestId: number | null;
  userNickname: string;
  requestLocation: string;
  requestSessionCount: number;
  requestPrice: number;
  matchStatus: MatchStatusType;
  profileImageUrl: string | null;
};

export type getRealtimeMatchingResponseDto = CommonResponseDto<RealtimeMatchingType[]>;
