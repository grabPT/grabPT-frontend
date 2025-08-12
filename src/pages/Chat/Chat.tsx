import { useCallback, useState } from 'react';

import { ChatInfo } from '@/features/Chat/components/ChatInfo';
import ChatSideBar from '@/features/Chat/components/ChatSideBar';
import { MessageInput } from '@/features/Chat/components/MessageInput';
import {
  type sendMessageRequestDto,
  useChatRoomSocket,
} from '@/features/Chat/hooks/useChatRoomSocket';
import type { ChatRoomListItemType } from '@/features/Chat/types/getChatRoomListType';
import Header from '@/layout/components/Header';
import { useUserRoleStore } from '@/store/useUserRoleStore';

// 경로 맞춰주세요

export const Chat = () => {
  const [selectedChat, setSelectedChat] = useState<ChatRoomListItemType | null>(null);

  // 전송만 쓰는 소켓 훅 (구독 off)
  const { sendMessage, connected } = useChatRoomSocket(
    selectedChat?.chatRoomId,
    {},
    { enableMessage: false, enableReadStatus: false },
  );

  const { userId } = useUserRoleStore();

  // 입력컴포넌트 -> 부모로 전송 콜백
  const sendText = useCallback(
    (body: string) => {
      if (!selectedChat || !connected) return;

      const dto: sendMessageRequestDto = {
        roomId: selectedChat.chatRoomId,
        senderId: userId ?? 1000000000,
        content: body,
        messageType: 'TEXT',
      };

      // 서버가 나에게도 브로드캐스트하므로 캐시 조작 불필요
      sendMessage(dto, { 'content-type': 'application/json;charset=UTF-8' });
    },
    [selectedChat, connected, userId, sendMessage],
  );

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />

      <div className="flex h-full flex-1">
        {/* 좌측: 채팅방 리스트 */}
        <ChatSideBar selectedChatId={selectedChat?.chatRoomId ?? null} onSelect={setSelectedChat} />

        {/* 우측: 채팅 상세 + 입력 */}
        <div className="flex h-full w-full flex-col bg-white">
          {selectedChat ? (
            <>
              <ChatInfo
                roomId={selectedChat.chatRoomId}
                name={selectedChat.roomName}
                img={selectedChat.otherUserProfile}
              />
              <MessageInput onSend={sendText} />
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-gray-400">
              대화할 상대를 선택해주세요
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
