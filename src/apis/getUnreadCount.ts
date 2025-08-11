import { privateInstance } from '@/libs/axios';
import type { CommonResponseDto } from '@/types/commonResponseDto';

type getUnreadCountResponseDto = CommonResponseDto<number>;

export const getUnreadCount = async (): Promise<getUnreadCountResponseDto> => {
  const { data } = await privateInstance.get('/chat/unreadCount', { withCredentials: true });
  return data;
};
