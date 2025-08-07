import { publicInstance } from '@/libs/axios';
import type { CommonResponseDto } from '@/types/commonResponseDto';

type getAccessTokenResponseDto = CommonResponseDto<string>;

export const getAccessToken = async (userId: 1 | 61): Promise<getAccessTokenResponseDto> => {
  const { data } = await publicInstance.get(`/api/users/${userId}`);
  localStorage.setItem('accessToken', data.result);
  console.log(`accessToken 업데이트 : ${data.result}`);
  return data;
};
