import { END_POINT } from '@/constants/endPoints';
import type {
  getChatRoomListRequestDto,
  getChatRoomListResponseDto,
} from '@/features/Chat/types/getChatRoomListType';
import { privateInstance } from '@/libs/axios';

export const getChatRoomList = async (
  params: getChatRoomListRequestDto,
): Promise<getChatRoomListResponseDto> => {
  try {
    const { data } = await privateInstance.get(END_POINT.CHAT.list, { params });
    return data;
  } catch (e) {
    throw e as Error;
  }
};
