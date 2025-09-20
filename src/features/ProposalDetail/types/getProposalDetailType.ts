import type { CommonResponseDto } from '@/types/commonResponseDto';

export type proposalDetailType = {
  suggestUserNickname: string;
  suggestCenter: string;
  profileImageUrl: string;
  suggestExpertId: number;
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

export type getProposalDetailResponseDto = CommonResponseDto<proposalDetailType>;
