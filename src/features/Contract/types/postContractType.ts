import type { CommonResponseDto } from '@/types/commonResponseDto';

export type userInfoType = {
  name: string;
  birth: string | null;
  phoneNumber: string;
  gender: 'MALE' | 'FEMALE' | null;
  address: string;
};

export type postContractInfoRequestDto = {
  contractId: number;
  body: userInfoType;
};

export type postContractInfoResponseDto = CommonResponseDto<number>;
