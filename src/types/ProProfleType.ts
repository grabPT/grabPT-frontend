import type { certificationResponse } from '@/apis/getProCertifications';
import type { SlideImage } from '@/components/ProfileImageSlide';

import type { CommonResponseDto } from './commonResponseDto';

export type Address = {
  city: string;
  district: string;
  street: string;
  zipcode: string;
  specAddress: string;
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

export type ProProfileType = {
  userId: number;
  profileImageUrl: string;
  userName: string;
  userNickname: string;
  centerName: string;
  categoryName: string;
  averageRating: number;
  profileDescription: string;
  centerDescription: string;
  photos: SlideImage[];
  reviews: Review[];
  pricePerSession: number;
  ptPrices: PtPrice[];
  userLocations: Address[];
};

export type ProProfileWithUserIdType = {
  userId: number;
  userNickname: string;
  profileImageUrl: string;
  proCenterDescription: string | null;
  categoryName: string;
  programDescription: string | null;
  pricePerSession: number;
  ptPrices?: PtPrice[];
  photos: SlideImage[];
  reviews: Review[] | null;
  address: Address[];
  centerName: string;
  introduction: string;
  certifications: certificationResponse[];
};

export type getProProfileResponseDto = CommonResponseDto<ProProfileType>;
export type getProProfileWithUserIdResponseDto = CommonResponseDto<ProProfileWithUserIdType>;
