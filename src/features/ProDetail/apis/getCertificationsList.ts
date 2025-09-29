import { END_POINT } from '@/constants/endPoints';
import type { getCredentialListResponseDto } from '@/features/ProDetail/types/credential';
import { publicInstance } from '@/libs/axios';

export const getCerificationsList = async (): Promise<getCredentialListResponseDto> => {
  try {
    const { data } = await publicInstance.get(END_POINT.MYPROPAGE.CERTIFICATIONS.certifications);
    return data;
  } catch (e) {
    throw e as Error;
  }
};
