import type { CommonResponseDto } from '@/types/commonResponseDto';

export interface Trainer {
  userId: number;
  userName: string;
  rating: number; // 별점
  centerName: string;
  suggestedPrice: number; // 1회당 가격
  sessionCount: number; // 총 세션 수
  profileImageUrl: string;
}

export type getCategoryProsInfoDto = CommonResponseDto<Trainer[]>;
