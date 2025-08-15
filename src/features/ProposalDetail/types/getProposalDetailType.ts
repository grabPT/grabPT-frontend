import type { CommonResponseDto } from '@/types/commonResponseDto';

export type proposalDetailType = {
  nickname: string;
  center: string;
  profileImageUrl: string;
  expertId: number;
  matchingId: number | null;
  userId: number;
  suggestedPrice: number;
  originalPrice: number;
  discountAmount: number;
  isDiscounted: true;
  message: string;
  location: string;
  photoUrls: string[];
  requestionId: number;
  suggestionId: number;
};

export type getProposalDetailResponseDto = CommonResponseDto<proposalDetailType>;
