import { END_POINT } from '@/constants/endPoints';
import type {
  getSuggestListRequestDto,
  getSuggestListResponseDto,
} from '@/features/SuggestList/types/getSuggestListType';
import { privateInstance } from '@/libs/axios';

// parameter: page
export const getSuggestList = async (
  params: getSuggestListRequestDto,
): Promise<getSuggestListResponseDto> => {
  try {
    const { data } = await privateInstance.get(END_POINT.SUGGESTS.list, { params });
    return data;
  } catch (e) {
    throw e as Error;
  }
};
