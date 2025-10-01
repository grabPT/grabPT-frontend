import type { CommonResponseDto } from '@/types/commonResponseDto';

export type getContractInfoResultType = {
  userInfo: {
    name: string;
    birth: string;
    phoneNumber: string;
    gender: 'MALE' | 'FEMALE';
    location: string;
    signImageUrl: string;
  };
  proInfo: {
    name: string;
    birth: string;
    phoneNumber: string;
    gender: 'MALE' | 'FEMALE';
    location: string;
    signImageUrl: string;
  };
  contractSessionCount: 0;
  contractPrice: 0;
  startDate: string;
  ptLocation: string;
  expireDate: string;
  status: 'MATCHED' | 'MATCHING' | 'WAITING';
  matchingId: number;
};

export type getContractInfoResponseDto = CommonResponseDto<getContractInfoResultType>;
