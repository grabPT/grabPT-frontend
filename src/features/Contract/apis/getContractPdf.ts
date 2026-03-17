import { END_POINT } from '@/constants/endPoints';
import type {
  getContractPdfRequestDto,
  getContractPdfResponseDto,
} from '@/features/Contract/types/getContractPdfType';
import { privateInstance } from '@/libs/axios';

export const getContractPdf = async (
  params: getContractPdfRequestDto,
): Promise<getContractPdfResponseDto> => {
  try {
    const { data } = await privateInstance.get(END_POINT.CONTRACTS.pdfLink(params.contractId));
    return data;
  } catch (e) {
    throw e as Error;
  }
};
