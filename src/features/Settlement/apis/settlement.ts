import { END_POINT } from '@/constants/endPoints';
import type { getSettlementListResponse } from '@/features/Settlement/types/settlement';
import { privateInstance } from '@/libs/axios';

export const getSettlementList = async (page: number): Promise<getSettlementListResponse> => {
  try {
    const { data } = await privateInstance.get(END_POINT.SETTLEMENT.settlement, {
      params: { page },
    });
    return data;
  } catch (e) {
    throw e as Error;
  }
};
