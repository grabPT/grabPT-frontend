import type { CommonResponseDto } from '@/types/commonResponseDto';

export interface Trainer {
  userId: number;
  userName: string;
  rating: number; // 별점
  proCenterName: string;
  suggestPrice: number; // 1회당 가격
  suggestSessionCount: number; // 총 세션 수
  profileImageUrl: string;
}

export type getCategoryExpertsInfoDto = CommonResponseDto<Trainer[]>;
