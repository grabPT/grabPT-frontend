import type { CommonResponseDto } from '@/types/commonResponseDto';

export type MatchingStatus = 'MATCHING' | '이거뭐임' | '이거뭐임';

export type RealtimeMatchingType = {
  id: number | null;
  nickname: string;
  region: string;
  sessionCount: number;
  totalPrice: number;
  matchStatus: string;
  profileImageUrl: string | null;
};

export type getRealtimeMatchingResponseDto = CommonResponseDto<RealtimeMatchingType[]>;
