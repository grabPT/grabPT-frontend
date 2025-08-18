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
    console.log('=== GET 요청 시작 ===');
    const response = await privateInstance.get<getProCertificationResponseDto>(
      '/mypage/pro/certification',
    );
    console.log('=== GET 요청 응답 ===');
    console.log('📋 Response data:', response.data);
    console.log('📋 Certifications:', response.data.result?.certifications);
    return response.data;
  } catch (error) {
    console.error('❌ GET 요청 실패:', error);
    throw Error('axios 에러');
  }
};
