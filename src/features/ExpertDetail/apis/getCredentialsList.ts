import { END_POINT } from '@/constants/endPoints';
import type { getCredentialListResponseDto } from '@/features/ExpertDetail/types/credential';
import { publicInstance } from '@/libs/axios';

export const getCredentialsList = async (): Promise<getCredentialListResponseDto> => {
  try {
    const { data } = await publicInstance.get(END_POINT.MYPROPAGE.CREDENTIALS.credentials);
    return data;
  } catch (e) {
    throw e as Error;
  }
};
