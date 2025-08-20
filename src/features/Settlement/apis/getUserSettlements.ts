import { END_POINT } from '@/constants/endPoints';
import type {
  getUserSettlementsRequestDto,
  getUserSettlementsResponseDto,
} from '@/features/Settlement/types/getUserSettlementsType';
import { privateInstance } from '@/libs/axios';

export const getUserSettlements = async (
  params: getUserSettlementsRequestDto,
): Promise<getUserSettlementsResponseDto> => {
  try {
    const { data } = await privateInstance.get(END_POINT.SETTLEMENT.user_settlement, { params });
    return data;
  } catch (e) {
    throw e as Error;
  }
};
