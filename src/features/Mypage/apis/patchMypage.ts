import { multipartInstance } from '@/libs/axios';
import { compressImage } from '@/utils/imageCompression';

export interface MypageAddressPayload {
  city: string;
  district: string;
  street: string;
  zipcode: string;
  // ↓ UI용 필드는 서버 전송에서 제외
  streetCode?: string;
  specAddress?: string;
}

export interface MyPagePatchPayload {
  nickname?: string;
  address?: MypageAddressPayload;
  profileImageFile?: File; // 선택
}

export const patchMyPage = async (payload: MyPagePatchPayload) => {
  // 서버 DTO 모양에 맞춰 request JSON 구성
  const requestObj = {
    nickname: payload.nickname ?? '',
    address: payload.address
      ? {
          city: payload.address.city,
          district: payload.address.district,
          street: payload.address.street,
          zipcode: payload.address.zipcode,
        }
      : undefined,
  };

  // multipart/form-data 조립
  const fd = new FormData();

  // @RequestParam("request") String 으로 받으므로 문자열로 전송
  fd.append('request', JSON.stringify(requestObj));

  // @RequestPart(value="image", required=false)
  if (payload.profileImageFile) {
    const compressed = await compressImage(payload.profileImageFile, { maxSizeMB: 0.5 });
    fd.append('image', compressed, compressed.name);
  }

  const { data } = await multipartInstance.patch('/mypage', fd);
  return data;
};
