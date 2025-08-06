import type {
  getRequestsListRequestDto,
  getRequestsListResponseDto,
} from '@/features/Requests/types/getRequestsListType';
import { privateInstance } from '@/libs/axios';

// parameter: sortBy, page, size
export const getRequestsList = async (
  params: getRequestsListRequestDto,
): Promise<getRequestsListResponseDto> => {
  try {
    const { data } = await privateInstance.get(`api/requestion/nearby`, { params });
    return data;
  } catch (e) {
    throw e as Error;
  }
};
