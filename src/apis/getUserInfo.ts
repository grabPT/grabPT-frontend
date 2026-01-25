// src/apis/user.ts
import { END_POINT } from '@/constants/endPoints';
import { privateInstance } from '@/libs/axios';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export interface Address {
  city: string;
  district: string;
  street: string;
  zipcode: string;
  streetCode: string;
  specAddress?: string; // 상세 주소
}

export interface UserInfo {
  userId: number;
  userNickname: string;
  userName: string;
  address: Address[];
  email: string;
  profileImageUrl: string;
  categoryName: string;
}

// /api/v1/users/info 응답 타입
export type GetUserInfoResponse = CommonResponseDto<UserInfo>;

/** accessToken으로 사용자 정보 조회 */

export async function getUserInfo(): Promise<GetUserInfoResponse> {
  try {
    const { data } = await privateInstance.get<CommonResponseDto<UserInfo>>(END_POINT.MYPAGE.ROOT);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('GET /mypage 실패');
  }
}
