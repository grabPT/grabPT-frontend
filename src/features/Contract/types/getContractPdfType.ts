import type { CommonResponseDto } from '@/types/commonResponseDto';

export type getContractPdfRequestDto = {
  contractId: number;
};

export type getContractPdfResponseDto = CommonResponseDto<string>;
