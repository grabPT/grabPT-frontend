import { END_POINT } from '@/constants/endPoints';
import { privateInstance } from '@/libs/axios';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export const deleteRequest = async (requestionId: number): Promise<CommonResponseDto<string>> => {
  try {
    const { data } = await privateInstance.delete<CommonResponseDto<string>>(
      END_POINT.REQUESTS.DELETE(requestionId),
    );
    return data;
  } catch (e) {
    console.log(e);
    throw e as Error;
  }
};
