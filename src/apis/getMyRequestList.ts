import { END_POINT } from '@/constants/endPoints';
import type { getMyRequestsListRequestDto } from '@/features/Mypage/types/getMyRequestsListRequestDto';
import { privateInstance } from '@/libs/axios';
import type { getMyRequestsListResponseDto } from '@/types/getMyRequestListResponse';

export const getMyRequestsList = async (
  params: getMyRequestsListRequestDto,
): Promise<getMyRequestsListResponseDto> => {
  try {
    const { data } = await privateInstance.get(END_POINT.MYPAGE.LIST.list, { params });
    return data;
  } catch (e) {
    throw e as Error;
  }
};
