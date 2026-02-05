import type { CommonResponseDto } from '@/types/commonResponseDto';

export type MatchStatusType = 'MATCHING' | 'MATCHED' | 'WAITING';

//상태에 따른 UI
export const MATCH_STATUS_UI: Record<
  MatchStatusType,
  { color: string; text: string }
> = {
  MATCHED: {
    color: 'bg-[#4CAF50]',
    text: '매칭 성공',
  },
  MATCHING: {
    color: 'bg-[#3B82F6]',
    text: '매칭 진행중',
  },
  WAITING: {
    color: 'bg-[#FF8A00]',
    text: '대기중',
  },
};

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
