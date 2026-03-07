import { END_POINT } from '@/constants/endPoints';
import type { getContractListResponseDto } from '@/features/Contract/types/getContractListType';
import { privateInstance } from '@/libs/axios';
import type { getContractListRequestDto } from '../types/getContractListType';

export const getContractList = async (params:getContractListRequestDto): Promise<getContractListResponseDto> => {
  try {
    const { data } = await privateInstance.get(END_POINT.CONTRACTS.list, { params });
    return data;
  } catch (e) {
    throw e as Error;
  }
};
