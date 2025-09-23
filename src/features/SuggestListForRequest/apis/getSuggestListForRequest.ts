import { END_POINT } from '@/constants/endPoints';
import type {
  getSuggestListForRequestRequestDto,
  getSuggestListForRequestResponseDto,
} from '@/features/SuggestListForRequest/types/getSuggestListForRequestType';
import { privateInstance } from '@/libs/axios';

// parameter: requestionId, page
export const getSuggestListForRequest = async (
  params: getSuggestListForRequestRequestDto,
): Promise<getSuggestListForRequestResponseDto> => {
  try {
    const { data } = await privateInstance.get(
      END_POINT.REQUESTS.SUGGESTS_FOR_REQUESTS(params.requestionId),
      { params },
    );
    console.log('ㅇㅇ');
    return data;
  } catch (e) {
    throw e as Error;
  }
};
