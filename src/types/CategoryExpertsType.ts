export interface Trainer {
  id: number;
  name: string;
  rating: number; // 별점
  centerName: string;
  pricePerSession: number; // 1회당 가격
  totalSessions: number; // 총 세션 수
  profileImageUrl: string;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

export type getCategoryExpertsInfoDto = ApiResponse<Trainer[]>;
