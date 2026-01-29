import type { CommonResponseDto } from '@/types/commonResponseDto';

export type suggestDetailType = {
  userNickname: string;
  centerName: string;
  profileImageUrl: string;
  proId: number;
  matchingId: number | null;
  userId: number;
  suggestedPrice: number;
  requestedPrice: number;
  discountedPrice: number;
  suggestionSessionCount: number;
  requestionSessionCount: number;
  discountedSessionCount: number;
  isDiscounted: true;
  message: string;
  location: string;
  photos: string[];
  requestionId: number;
  suggestionId: number; //이거 추후에 사용하도록 추가할 에정
  sessionCount: number; //제안한 세션 수, 요청 세션 수는 따로 없습니다.
};

export type getSuggestDetailResponseDto = CommonResponseDto<suggestDetailType>;
