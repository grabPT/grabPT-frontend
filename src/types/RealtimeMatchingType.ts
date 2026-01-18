import type { CommonResponseDto } from '@/types/commonResponseDto';

export type MatchStatusType = 'MATCHING' | 'MATCHED';

export type RealtimeMatchingType = {
  requestionId: number | null;
  userNickname: string;
  location: string;
  sessionCount: number;
  requestedPrice: number;
  matchingStatus: MatchStatusType;
  profileImageUrl: string | null;
};

export type getRealtimeMatchingResponseDto = CommonResponseDto<RealtimeMatchingType[]>;
