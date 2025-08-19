import { privateInstance } from '@/libs/axios';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export const postContractPdf = async (contractId: number): Promise<CommonResponseDto<string>> => {
  try {
    const { data } = await privateInstance.post(`/contracts/${contractId}/submit`);
    return data;
  } catch (e) {
    console.log(e);
    throw e as Error;
  }
};
