import { END_POINT } from '@/constants/endPoints';
import type {
  getRequestsListRequestDto,
  getRequestsListResponseDto,
} from '@/features/Requests/types/getRequestsListType';
import { privateInstance } from '@/libs/axios';

//import type { RequestStatusResponseDto } from '../types/getMatchingRequestListType';

// parameter: sortBy, page, size
export const getRequestsList = async (
  params: getRequestsListRequestDto,
): Promise<getRequestsListResponseDto> => {
  try {
    const { data } = await privateInstance.get(END_POINT.MYPAGE.REQUESTS.requests, { params });
    return data;
  } catch (e) {
    throw e as Error;
  }
};

export const getMatcingRequestsList = async (
  params: getRequestsListRequestDto,
): Promise<getRequestsListResponseDto> => {
  try {
    const { data } = await privateInstance.get(END_POINT.REQUESTS.LIST.list, { params });
    return data;
  } catch (e) {
    throw e as Error;
  }
};
