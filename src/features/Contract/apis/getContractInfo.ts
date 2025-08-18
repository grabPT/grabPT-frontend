import type { getContractInfoResponseDto } from '@/features/Contract/types/getContractInfoType';
import { privateInstance } from '@/libs/axios';

export const getContractInfo = async (contractId: number): Promise<getContractInfoResponseDto> => {
  try {
    const { data } = await privateInstance.get(`/contract/${contractId}`);
    return data;
  } catch (e) {
    throw e as Error;
  }
};
