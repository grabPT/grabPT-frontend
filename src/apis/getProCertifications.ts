import { END_POINT } from '@/constants/endPoints';
import { privateInstance } from '@/libs/axios';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export interface certificationResponse {
  certificationType: string;
  description: string;
  imageUrl?: string;
}

interface ProCertificationResponse {
  certifications: certificationResponse[];
}

export type getProCertificationResponseDto = CommonResponseDto<ProCertificationResponse>;

export const getProCertifications = async (): Promise<getProCertificationResponseDto> => {
  try {
    const response = await privateInstance.get<getProCertificationResponseDto>(
      END_POINT.MYPROPAGE.CERTIFICATIONS.certifications,
    );
    return response.data;
  } catch (error) {
    throw Error('axios 에러');
  }
};
