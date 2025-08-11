import { useCallback, useState } from 'react';

import { SearchIcon } from 'lucide-react';

import ChatCard from '@/features/Chat/components/ChatCard';
import { ChatInfo } from '@/features/Chat/components/ChatInfo';
import { MessageInput } from '@/features/Chat/components/MessageInput';
import {
  type sendMessageRequestDto,
  useChatRoomSocket,
} from '@/features/Chat/hooks/useChatRoomSocket';
import { useGetChatRoomList } from '@/features/Chat/hooks/useGetChatRoomList';
import type { ChatRoomListItemType } from '@/features/Chat/types/getChatRoomListType';
import Header from '@/layout/components/Header';
import { useUserRoleStore } from '@/store/useUserRoleStore';

// 경로 맞춰주세요

export const Chat = () => {
  const [keyword, setKeyword] = useState('');
  const handleSearch = () => {
    console.log('검색:', keyword);
  };

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

  const { data: chatRoomList } = useGetChatRoomList({});
  // 필요시 데이터 변경시에만 로그 출력
  // useEffect(() => { console.log(chatRoomList); }, [chatRoomList]);

  const handleChatSelect = (chat: ChatRoomListItemType) => {
    setSelectedChat(chat);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />

      <div className="flex h-full flex-1">
        {/* 좌측: 채팅방 리스트 */}
        <div className="flex h-full w-[26.125rem] flex-col items-center border-t-1 border-r-1 border-gray-300 bg-white">
          <div className="sticky top-[70px] z-10 w-[22rem] bg-white pt-3">
            <div className="h-10 w-full rounded-full bg-gradient-to-r from-[#003EFB] to-[#FF00B2] p-[3px]">
              <div className="flex h-full w-full items-center rounded-full bg-white px-[16px] pr-[15px]">
                <input
                  type="text"
                  placeholder="검색"
                  className="font-inter w-full text-[13px] leading-[16px] font-semibold text-black placeholder-[#CCCCCC] outline-none"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <SearchIcon className="h-5 w-5 text-[#CCCCCC]" />
              </div>
            </div>
          </div>

          <div className="w-full flex-1 overflow-y-auto pt-5">
            {chatRoomList?.map((chat, idx) => (
              <div
                key={idx} // 가능하면 chat.chatRoomId 사용 권장
                className={`${selectedChat == chat && 'bg-white'} flex h-20 w-full cursor-pointer items-center bg-white px-3 duration-150 hover:bg-gray-300 hover:ease-in-out`}
                onClick={() => handleChatSelect(chat)}
              >
                <ChatCard chat={chat} />
              </div>
            ))}
          </div>
        </div>

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
