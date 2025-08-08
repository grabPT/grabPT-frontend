import { END_POINT } from '@/constants/endPoints';
import type {
  getMessagesRequestDto,
  getMessagesResponseDto,
} from '@/features/Chat/types/getMessagesType';
import { privateInstance } from '@/libs/axios';

// parameter: roomId, cursor?
export const getMessages = async (
  params: getMessagesRequestDto,
): Promise<getMessagesResponseDto> => {
  try {
    const { data } = await privateInstance.get(END_POINT.CHAT.messages(params.roomId), { params });
    return data;
  } catch (e) {
    throw e as Error;
  }
};
