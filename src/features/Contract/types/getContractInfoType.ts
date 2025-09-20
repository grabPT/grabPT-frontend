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
  contractSessionCount: 0;
  contractPrice: 0;
  startDate: string;
  ptAddress: string;
  contractDate: string;
  status: 'MATCHED' | 'MATCHING' | 'WAITING';
  matchingId: number;
};

export type getContractInfoResponseDto = CommonResponseDto<getContractInfoResultType>;
