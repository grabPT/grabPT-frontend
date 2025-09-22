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
  //Dto 수정 이전 것
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

export type getProProfileType = {
  //Dto 수정 반영
  userNickName: string;
  center: string;
  profileImageUrl: string;
  userId: number;
  proCenterDescription: string;
  introduction: string;
  certifications: certificationResponse[] | null;
  photos: SlideImage[];
  categoryName: string;
  programDescription: string | null;
  pricePerSession: number;
  totalSessions: number;
  ptPrices: PtPrice[];
  reviews: any[] | null;
  userLocations: Address[];
};

export type getProProfileResponseDto = CommonResponseDto<getProProfileType>;
