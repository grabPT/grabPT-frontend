import type { CommonResponseDto } from '@/types/commonResponseDto';

export type getContractInfoResultType = {
  userInfo: {
    name: string;
    birth: string;
    phoneNumber: string;
    gender: 'MALE' | 'FEMALE';
    address: string;
    signUrl: string;
  } | null;
  proInfo: {
    name: string;
    birth: string;
    phoneNumber: string;
    gender: 'MALE' | 'FEMALE';
    address: string;
    signUrl: string;
  } | null;
  totalSession: 0;
  price: 0;
  startDate: number[];
  ptAddress: string;
  status: 'MATCHED' | 'MATCHING' | 'WAITING';
};

export type getContractInfoResponseDto = CommonResponseDto<getContractInfoResultType>;
