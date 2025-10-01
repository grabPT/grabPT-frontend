import { END_POINT } from '@/constants/endPoints';
import { privateInstance } from '@/libs/axios';
import type { CommonResponseDto } from '@/types/commonResponseDto';

// parameter: roomId, cursor?
export const postReadWhenEnter = async (roomId: number): Promise<CommonResponseDto<string>> => {
  try {
    const { data } = await privateInstance.post(END_POINT.CHAT.readWhenEnter(roomId), roomId);
    return data;
  } catch (e) {
    console.log(e);
    throw e as Error;
  }
};

// parameter: roomId,
export const postReadWhenExist = async (roomId: number): Promise<CommonResponseDto<string>> => {
  try {
    const { data } = await privateInstance.post(END_POINT.CHAT.readWhenExist(roomId), roomId);
    return data;
  } catch (e) {
    console.log(e);
    throw e as Error;
  }
};
