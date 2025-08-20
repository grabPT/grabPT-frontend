import type {
  getContractPdfRequestDto,
  getContractPdfResponseDto,
} from '@/features/Contract/types/getContractPdfType';
import { privateInstance } from '@/libs/axios';

export const getContractPdf = async (
  params: getContractPdfRequestDto,
): Promise<getContractPdfResponseDto> => {
  try {
    const { data } = await privateInstance.get(`/contract/${params.contractId}/pdf`);
    return data;
  } catch (e) {
    throw e as Error;
  }
};
