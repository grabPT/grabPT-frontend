// src/apis/user.ts
import { publicInstance } from '@/libs/axios';

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
  nickname: string;
  name: string;
  address: Address[];
  email: string;
  profileImageUrl: string;
  role: 'PRO' | 'USER'; // 필요 시 enum 확장
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string; // e.g., "COMMON200"
  message: string; // e.g., "성공입니다."
  result: T;
}

// /api/v1/users/info 응답 타입
export type GetUserInfoResponse = ApiResponse<UserInfo>;

/** accessToken으로 사용자 정보 조회 */
export async function getUserInfo(accessToken: string): Promise<GetUserInfoResponse> {
  try {
    const { data } = await publicInstance.get<ApiResponse<UserInfo>>('/mypage', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('GET /api/users/info 실패');
  }
}
