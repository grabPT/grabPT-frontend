import { privateInstance } from '@/libs/axios';
import type { getProProfileResponseDto } from '@/types/ProPrifleType';

export const getProProfile = async () => {
  try {
    const response = await privateInstance.get<getProProfileResponseDto>('/mypage/pro');
    return response.data;
  } catch (error) {
    console.error(error);
    throw Error('axios 에러');
  }
};
