import { END_POINT } from '@/constants/endPoints';
import { privateInstance } from '@/libs/axios';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export const postContractPdf = async (contractId: number): Promise<CommonResponseDto<string>> => {
  try {
    const { data } = await privateInstance.post(END_POINT.CONTRACTS.submitPdf(contractId));
    return data;
  } catch (e) {
    console.log(e);
    throw e as Error;
  }
};
