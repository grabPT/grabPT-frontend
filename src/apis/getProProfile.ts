import { END_POINT } from '@/constants/endPoints';
import { privateInstance, publicInstance } from '@/libs/axios';
import type {
  getProProfileResponseDto,
  getProProfileWithUserIdResponseDto,
} from '@/types/ProProfileType';

export const getProProfile = async () => {
  try {
    const response = await privateInstance.get<getProProfileResponseDto>(
      END_POINT.MYPROPAGE.PROFILE.profile,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw Error('axios 에러');
  }
};

export const getProProfileWithUserId = async (userId: number) => {
  const { data } = await publicInstance.get<getProProfileWithUserIdResponseDto>(
    END_POINT.PRODETAIL.profile(userId),
    { headers: { accept: 'application/json' } },
  );
  return data;
};
