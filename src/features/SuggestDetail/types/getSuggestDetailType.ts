import type { CommonResponseDto } from '@/types/commonResponseDto';

export type suggestDetailType = {
  suggestUserNickname: string;
  suggestCenter: string;
  profileImageUrl: string;
  suggestProId: number;
  suggestMatchingId: number | null;
  suggestUserId: number;
  suggestSuggestedPrice: number;
  suggestOriginalPrice: number;
  suggestDiscountAmount: number;
  suggestIsDiscounted: true;
  suggestMessage: string;
  suggestLocation: string;
  photos: string[];
  suggestRequestionId: number;
};

export type getSuggestDetailResponseDto = CommonResponseDto<suggestDetailType>;
