import type { CommonResponseDto } from '@/types/commonResponseDto';

export const CredentialType = {
  AWARD: '수상',
  EDUCATION: '학력',
  EXPERIENCE: '경력',
  CERTIFICATE: '자격증',
} as const;
export type CredentialType = (typeof CredentialType)[keyof typeof CredentialType];

export type credentialListItem = {
  certificationType: CredentialType;
  description: string;
};

export type getCredentialListResultDTO = {
  certifications: credentialListItem[];
};
export type getCredentialListResponseDto = CommonResponseDto<getCredentialListResultDTO>;
