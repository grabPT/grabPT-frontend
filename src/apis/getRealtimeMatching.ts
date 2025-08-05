import { publicInstance } from '@/libs/axios';
import type { getRealtimeMatchingResponseDto } from '@/types/RealtimeMatchingType';

export const getRealtimeMatching = async (
  category: string,
): Promise<getRealtimeMatchingResponseDto> => {
  const { data } = await publicInstance.get(`/api/v1/requests/${category}`);
  console.log(`getRealtimeMatching axios 성공 : ${data}`);
  console.log(data);
  return data;
};
