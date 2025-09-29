import { END_POINT } from '@/constants/endPoints';
import type { getContractInfoResponseDto } from '@/features/Contract/types/getContractInfoType';
import { privateInstance } from '@/libs/axios';

export const getContractInfo = async (contractId: number): Promise<getContractInfoResponseDto> => {
  try {
    const { data } = await privateInstance.get(END_POINT.CONTRACTS.detail(contractId));
    return data;
  } catch (e) {
    throw e as Error;
  }
};
