import { multipartInstance, privateInstance } from '@/libs/axios';

export interface ProDescriptionPayload {
  description: string;
}

export interface ProPhotosPayload {
  photos: string[];
}

export interface ptPriceUpdateRequestDtoList {
  pricePerSession: number;
  totalSessions: number;
}
export interface ProPricePayload {
  ptPriceUpdateRequestDtoList: ptPriceUpdateRequestDtoList[];
}

export interface ProCenterPayload {
  center: string;
  centerDescription: string;
}

// 프로 설명 description Edit (토큰 자동 주입)
export const editProDescription = async (payload: ProDescriptionPayload) => {
  const { data } = await privateInstance.patch('/mypage/pro/description', payload);
  return data;
};

export const editProPhotos = async (files: File[], urls: string[]) => {
  const formData = new FormData();
  urls.forEach((url) => formData.append('photoUrls', url)); // 기존 이미지
  files.forEach((file) => formData.append('photos', file)); // 새 이미지
  const { data } = await multipartInstance.patch('/mypage/pro/photos', formData);
  return data;
};

export const editProPrice = async (payload: ProPricePayload) => {
  const { data } = await privateInstance.patch('/mypage/pro/ptPrice', payload);
  return data;
};

export const editProCenter = async (payload: ProCenterPayload) => {
  const { data } = await privateInstance.patch('/mypage/pro/center', payload);
  return data;
};
