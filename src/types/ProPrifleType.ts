import type { CommonResponseDto } from './commonResponseDto';

export type Address = {
  city: string;
  district: string;
  street: string;
  zipcode: string;
};

export type ProProfileType = {
  proId: number;
  profileImageUrl: string;
  proName: string;
  center: string | null;
  categoryName: string;
  averageRating: number;
  description: string | null;
  centerName: string | null;
  photos: string[]; // 이미지 URL 배열
  reviews: any[] | null; // 상세 타입 정의가 필요한 경우 인터페이스 추가
  programDescription: string | null;
  pricePerSession: number;
  totalSessions: number;
  address: Address[];
};

export type getProPrifleResponseDto = CommonResponseDto<ProProfileType>;
