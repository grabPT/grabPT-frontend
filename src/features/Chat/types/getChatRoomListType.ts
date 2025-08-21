import type { CommonResponseDto } from '@/types/commonResponseDto';

export type getChatRoomListRequestDto = {
  keyword?: string;
};

export type ChatRoomListItemType = {
  chatRoomId: number;
  userId: number;
  unreadCount: number;
  roomName: string;
  lastMessage: string;
  lastMessageTime: string;
  otherUserProfile: string;
  otherUserId: number;
};

export type getChatRoomListResponseDto = CommonResponseDto<ChatRoomListItemType[]>;
