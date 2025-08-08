import { END_POINT } from '@/constants/endPoints';
import type { getMyInfoListRequestDto } from '@/features/Mypage/types/getMyRequestsListRequestDto';
import { privateInstance } from '@/libs/axios';
import type { getMyRequestsListResponseDto } from '@/types/getMyRequestListResponse';

export const getMyRequestsList = async (
  params: getMyInfoListRequestDto,
): Promise<getMyRequestsListResponseDto> => {
  try {
    const { data } = await privateInstance.get(END_POINT.MYPAGE.REQUESTS.requests, { params });
    return data;
  } catch (e) {
    throw e as Error;
  }
};
