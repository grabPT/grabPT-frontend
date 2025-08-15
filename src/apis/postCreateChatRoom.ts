import { privateInstance } from '@/libs/axios';
import type { CommonResponseDto } from '@/types/commonResponseDto';

export type postCreateChatRoomRequestDto = {
  userId: number;
  proId: number;
};

export type postCreatechatRoomResultType = {
  chatRoomId: number;
};

export type postCreateChatRoomResponseDto = CommonResponseDto<postCreatechatRoomResultType>;

export const postCreateChatRoom = async (
  params: postCreateChatRoomRequestDto,
): Promise<postCreateChatRoomResponseDto> => {
  try {
    const { data } = await privateInstance.post(`/chatRoom/request`, params);
    return data;
  } catch (e) {
    console.log(e);
    throw e as Error;
  }
};
