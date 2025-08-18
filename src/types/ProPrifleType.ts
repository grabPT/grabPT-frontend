import type { certificationResponse } from '@/apis/getProCertifications';
import type { SlideImage } from '@/components/ProfileImageSlide';

import type { CommonResponseDto } from './commonResponseDto';

export type Address = {
  city: string;
  district: string;
  street: string;
  zipcode: string;
};

export type PtPrice = {
  sessionCount: number;
  price: number;
};

export type ProProfileType = {
  proId: number;
  profileImageUrl: string;
  proName: string;
  userName: string;
  center: string | null;
  centerDescription: string | null;
  categoryName: string;
  averageRating: number;
  description: string | null;
  centerName: string | null;
  photos: SlideImage[]; // 이미지 URL 배열
  reviews: any[] | null; // 상세 타입 정의가 필요한 경우 인터페이스 추가
  programDescription: string | null;
  pricePerSession: number;
  totalSessions: number;
  ptPrices?: PtPrice[];
  address: Address[];
  introduction?: string | null;
  name?: string | null;
  certifications?: certificationResponse[] | null;
};

export type getProProfileResponseDto = CommonResponseDto<ProProfileType>;
