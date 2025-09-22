import { useCallback, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { ChatInfo } from '@/features/Chat/components/ChatInfo';
import ChatSideBar from '@/features/Chat/components/ChatSideBar';
import MessageInput from '@/features/Chat/components/MessageInput';
import {
  type sendMessageRequestDto,
  useChatRoomSocket,
} from '@/features/Chat/hooks/useChatRoomSocket';
import { usePostFile } from '@/features/Chat/hooks/usePostFile';
import type { ChatRoomListItemType } from '@/features/Chat/types/getChatRoomListType';
import Header from '@/layout/components/Header';
import { useRoleStore } from '@/store/useRoleStore';

// 경로 맞춰주세요

const Chat = () => {
  const location = useLocation();
  const selectedProId: number | undefined = location.state?.proId;

  const [selectedChat, setSelectedChat] = useState<ChatRoomListItemType | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  // 전송만 쓰는 소켓 훅 (구독 off)
  const { sendMessage, connected } = useChatRoomSocket(
    selectedChat?.chatRoomId,
    {},
    { enableMessage: false, enableReadStatus: false },
  );

  const userId = useRoleStore((state) => state.userId);

  // 입력컴포넌트 -> 부모로 전송 콜백
  const sendText = useCallback(
    (body: string) => {
      if (!selectedChat || !connected || !userId) return;

      const dto: sendMessageRequestDto = {
        roomId: selectedChat.chatRoomId,
        senderId: userId,
        content: body,
        messageType: 'TEXT',
      };

      // 서버가 나에게도 브로드캐스트하므로 캐시 조작 불필요
      sendMessage(dto);
    },
    [selectedChat, connected, userId, sendMessage],
  );

  // 파일 업로드
  const { mutate: uploadFile, isPending: isUploading } = usePostFile();

  const sendFile = useCallback(
    (file: File) => {
      if (!selectedChat) return;
      uploadFile(
        { roomId: selectedChat.chatRoomId, file },
        {
          onSuccess: (res) => {
            // 서버가 STOMP로 브로드캐스트해주면 캐시 조작 불필요
            console.log('파일 업로드 성공', res);
            const dto: sendMessageRequestDto = {
              roomId: selectedChat.chatRoomId,
              senderId: userId ?? 1000000000,
              content: res.result.content,
              messageType: res.result.messageType,
            };
            sendMessage(dto, { 'content-type': 'application/json;charset=UTF-8' });
          },
          onSettled: () => {
            setPendingFile(null); // 부모 상태 정리
          },
        },
      );
    },
    [selectedChat, sendMessage, uploadFile, userId],
  );

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />

      <div className="flex h-full flex-1">
        {/* 좌측: 채팅방 리스트 */}
        <ChatSideBar
          selectedChatId={selectedChat?.chatRoomId ?? null}
          selectedProId={selectedProId}
          onSelect={setSelectedChat}
        />

        {/* 우측: 채팅 상세 + 입력 */}
        <div className="flex h-full w-full flex-1 flex-col bg-white">
          {selectedChat ? (
            <>
              <ChatInfo
                roomId={selectedChat.chatRoomId}
                name={selectedChat.roomName}
                img={selectedChat.otherUserProfile}
              />
              <MessageInput
                onSend={sendText}
                pendingFile={pendingFile}
                onFileSelect={setPendingFile}
                onSendFile={sendFile}
                sending={isUploading}
              />
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

export default Chat;
