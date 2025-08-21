import { END_POINT } from '@/constants/endPoints';
import type { getMyInfoListRequestDto } from '@/features/Mypage/types/getMyRequestsListRequestDto';
import { privateInstance } from '@/libs/axios';
import type { getMyRequestsListAtMainPageResponseDto } from '@/types/getMyRequestListAtMainPageType';

export const getMyRequestsListAtMainPage = async (
  params: getMyInfoListRequestDto,
): Promise<getMyRequestsListAtMainPageResponseDto> => {
  try {
    const { data } = await privateInstance.get(END_POINT.HOME.requests, { params });
    return data;
  } catch (e) {
    throw e as Error;
  }
};
