import { END_POINT } from '@/constants/endPoints';
import { multipartInstance, privateInstance } from '@/libs/axios';

export interface ProDescriptionPayload {
  profileDescription: string;
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
  centerName: string;
  centerDescription: string;
}

// 프로 설명 description Edit (토큰 자동 주입)
export const editProDescription = async (payload: ProDescriptionPayload) => {
  const { data } = await privateInstance.patch(
    END_POINT.MYPROPAGE.DESCRIPTION.description,
    payload,
  );
  return data;
};

// src/features/Mypage/hooks/useEditProDescription.ts (또는 apis 파일)
export const editProPhotos = async (existingPhotoUrls: string[], newPhotos: File[]) => {
  const formData = new FormData();

  // 서버 스펙: request = {"existingPhotoUrls":[...]}
  // 우선 JSON Blob 방식
  const requestJson = { existingPhotoUrls };
  formData.append('request', new Blob([JSON.stringify(requestJson)], { type: 'application/json' }));

  // 만약 위 방식이 400/415 뜨면 ↓로 교체
  // formData.append('request', JSON.stringify(requestJson));

  // 서버 스펙: 새 파일은 newPhotos (복수)
  newPhotos.forEach((file) => formData.append('newPhotos', file, file.name));

  // ❌ Content-Type 수동 지정 금지 (boundary는 브라우저/axios가 설정)
  const { data } = await multipartInstance.patch(END_POINT.MYPROPAGE.PHOTOS.photos, formData);
  return data;
};

export const editProPrice = async (payload: ProPricePayload) => {
  const { data } = await privateInstance.patch(END_POINT.MYPROPAGE.PTPRICE.ptPrice, payload);
  return data;
};

export const editProCenter = async (payload: ProCenterPayload) => {
  const { data } = await privateInstance.patch(END_POINT.MYPROPAGE.CENTER.center, payload);
  return data;
};
