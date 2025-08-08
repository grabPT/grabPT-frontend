import type { CommonResponseDto } from '@/types/commonResponseDto';

export type getMessagesRequestDto = {
  roomId: number;
  cursor?: number;
};

export type messageType = {
  messageId: number;
  roomId: number;
  senderId: number;
  content: string;
  messageType: 'FILE' | 'IMAGE' | 'TEXT';
  sendAt: string;
  readCount: number;
};

export type getMessagesResultType = {
  messages: messageType[];
  cursor: number;
};

export type getMessagesResponseDto = CommonResponseDto<getMessagesResultType>;
