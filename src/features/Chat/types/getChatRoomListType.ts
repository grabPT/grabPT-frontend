import type { CommonResponseDto } from '@/types/commonResponseDto';

export type getChatRoomListRequestDto = {
  keyword?: string;
};

export type ChatRoomListItemType = {
  roomId: number;
  userId: number;
  unreadCount: number;
  roomName: string;
  lastMessage: string;
  lastMessageTime: string;
  otherUserProfileImageUrl: string;
  otherUserId: number;
};

export type getChatRoomListResponseDto = CommonResponseDto<ChatRoomListItemType[]>;
