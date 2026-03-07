import type { CommonResponseDto } from '@/types/commonResponseDto';

export type MatchStatusType = 'MATCHING' | 'MATCHED' | 'WAITING' | 'CLOSED' | 'COMPLETED';

//상태에 따른 UI
export const MATCH_STATUS_UI: Record<
  MatchStatusType,
  { color: string; text: string; placeholder: string }
> = {
  MATCHED: {
    color: 'bg-[#4CAF50]',
    text: '매칭 완료',
    placeholder: '매칭이 완료된 요청서입니다',
  },
  MATCHING: {
    color: 'bg-[#3B82F6]',
    text: '매칭 중',
    placeholder: '매칭이 진행 중인 요청서입니다',
  },
  WAITING: {
    color: 'bg-[#FF8A00]',
    text: '대기중',
    placeholder: '제안서를 기다리는 중입니다',
  },
  CLOSED: {
    color: 'bg-gray-300',
    text: '만료됨',
    placeholder: '만료된 요청서입니다',
  },
  COMPLETED: {
    color: 'bg-[#7C3AED]',
    text: '결제 완료',
    placeholder: '결제가 완료된 요청서입니다',
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
