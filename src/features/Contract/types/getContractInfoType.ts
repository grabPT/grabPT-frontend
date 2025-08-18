import type { CommonResponseDto } from '@/types/commonResponseDto';

export type getContractInfoResultType = {
  userInfo: {
    name: string;
    birth: string;
    phoneNumber: string;
    gender: 'MALE' | 'FEMALE';
    address: string;
    signUrl: string;
  };
  proInfo: {
    name: string;
    birth: string;
    phoneNumber: string;
    gender: 'MALE' | 'FEMALE';
    address: string;
    signUrl: string;
  };
  totalSession: 0;
  price: 0;
  startDate: string;
  ptAddress: string;
  contractDate: string;
  status: 'MATCHED' | 'MATCHING' | 'WAITING';
};

export type getContractInfoResponseDto = CommonResponseDto<getContractInfoResultType>;
