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

export type Review = {
  reviewer: string;
  rating: number;
  content: string;
};
export type BaseProProfile = {
  userId: number;
  userNickName: string;
  profileImageUrl: string;
  proCenterDescription: string | null;
  categoryName: string;
  programDescription: string | null;
  pricePerSession: number;
  ptPrices?: PtPrice[];
  photos: SlideImage[];
  reviews: Review[] | null;
  address: Address[];
};
export type ProProfileType = BaseProProfile & {
  proName: string;
  userName: string;
  proCenterName: string | null;
  averageRating: number;
  description: string | null;
  centerName: string | null;
  totalSessions: number;
};

export type ProProfileWithUserIdType = BaseProProfile & {
  centerName: string;
  introduction: string;
  certifications: certificationResponse[];
};

export type getProProfileResponseDto = CommonResponseDto<ProProfileType>;
export type getProProfileWithUserIdResponseDto = CommonResponseDto<ProProfileWithUserIdType>;
