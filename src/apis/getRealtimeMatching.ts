import { END_POINT } from '@/constants/endPoints';
import { publicInstance } from '@/libs/axios';
import type { getRealtimeMatchingResponseDto } from '@/types/RealtimeMatchingType';
import type { SportsSlugType } from '@/types/SportsType';

export const getRealtimeMatching = async (
  category: SportsSlugType,
): Promise<getRealtimeMatchingResponseDto> => {
  try {
    const { data } = await publicInstance.get(END_POINT.CATEGORY.realtime(category));
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(`axios 에러`);
  }
};
