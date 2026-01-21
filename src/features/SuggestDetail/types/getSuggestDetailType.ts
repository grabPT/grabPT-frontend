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
  discountAmount: number;
  isDiscounted: true;
  message: string;
  location: string;
  photos: string[];
  requestionId: number;
  suggestionId: number; //이거 추후에 사용하도록 추가할 에정
  //TODO:전문가 sessionCount 추가해서 반영하기 
};

export type getSuggestDetailResponseDto = CommonResponseDto<suggestDetailType>;
