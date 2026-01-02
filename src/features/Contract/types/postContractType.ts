import type { CommonResponseDto } from '@/types/commonResponseDto';

export type userInfoType = {
  name: string;
  birth: string | null;
  phoneNumber: string;
  gender: 'MALE' | 'FEMALE' | null;
  location: string;
};

export type proInfoType = userInfoType & {
  startDate: string;
  expireDate: string;
};

export type postContractUserInfoRequestDto = {
  contractId: number;
  body: userInfoType;
};

export type postContractProInfoRequestDto = {
  contractId: number;
  body: proInfoType;
};

export type postContractInfoResponseDto = CommonResponseDto<number>;
