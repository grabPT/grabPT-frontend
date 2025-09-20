import { END_POINT } from '@/constants/endPoints';
import { privateInstance } from '@/libs/axios';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export type getUnreadCountResponseDto = CommonResponseDto<number>;

export const getUnreadCount = async (): Promise<getUnreadCountResponseDto> => {
  const { data } = await privateInstance.get(END_POINT.CHAT.unreadCount, { withCredentials: true });
  return data;
};
