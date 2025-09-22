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
  userId: number;
  profileImageUrl: string;
  proName: string;
  userName: string;
  userNickName: string;
  proCenterName: string | null;
  proCenterDescription: string | null;
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
  userLocations: Address[];
};
export type ProProfileWithUserIdType = {
  userNickName: string;
  center: string;
  profileImageUrl: string;
  userId: number;
  proCenterDescription: string;
  introduction: string;
  certifications: certificationResponse[];
  photos: SlideImage[];
  categoryName: string;
  programDescription: string;
  pricePerSession: number;
  ptPrices: PtPrice[];
  reviews: Review[];
  userLocations: Address[];
};
export type Review = {
  reviewer: string;
  rating: number;
  content: string;
};
export type getProProfileResponseDto = CommonResponseDto<ProProfileType>;
export type getProProfileWithUserIdResponseDto = CommonResponseDto<ProProfileWithUserIdType>;
