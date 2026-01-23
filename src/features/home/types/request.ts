import type { MatchStatusType } from '@/types/RealtimeMatchingType';
import type { TimeSlot } from '@/types/ReqeustsType';

export type RequestCardProps = {
  nickname: string;
  region: string;
  tags: string[];
  memo: string;
};

// 메인 페이지 요청서 슬라이더에서 사용하는 타입
export type RequestSliderItemType = {
  requestId: number;
  availableDays: string[];
  availableTimes: TimeSlot[];
  categoryName: string;
  content: string;
  status?: MatchStatusType;
  imageURL?: string;
  proProfileId?: number;
  proNickname?: string;
  canWriteReview?: boolean;
  // PRO용 필드
  nickname?: string;
  userProfileImageUrl?: string;
};
