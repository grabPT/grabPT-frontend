import { privateInstance, publicInstance } from '@/libs/axios';
import type { getProProfileResponseDto } from '@/types/ProProfleType';

export const getProProfile = async () => {
  try {
    const response = await privateInstance.get<getProProfileResponseDto>('/mypage/pro');
    return response.data;
  } catch (error) {
    console.error(error);
    throw Error('axios 에러');
  }
};

export const getProProfileWithUserId = async (userId: number) => {
  const { data } = await publicInstance.get<getProProfileResponseDto>(
    `/api/category-proprofile/${userId}`,
    { headers: { accept: 'application/json' } },
  );
  return data;
};
