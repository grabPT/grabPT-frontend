import { publicInstance } from '@/libs/axios';
import type { getRealtimeMatchingResponseDto } from '@/types/RealtimeMatchingType';

export const getRealtimeMatching = async (
  category: string,
): Promise<getRealtimeMatchingResponseDto> => {
  try {
    const { data } = await publicInstance.get(`/api/v1/requests/${category}`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(`axios 에러`);
  }
};
