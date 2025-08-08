import { useState } from 'react';

import { SearchIcon } from 'lucide-react';

import ChatSendIcon from '@/features/Chat/assets/ChatSendIcon.svg';
import ClipIcon from '@/features/Chat/assets/ClipIcon.svg';
import ChatCard from '@/features/Chat/components/ChatCard';
import { ChatInfo } from '@/features/Chat/components/ChatInfo';
import { useGetChatRoomList } from '@/features/Chat/hooks/useGetChatRoomList';
import type { ChatRoomListItemType } from '@/features/Chat/types/getChatRoomListType';
import Header from '@/layout/components/Header';

export const Chat = () => {
  const [keyword, setKeyword] = useState('');
  const handleSearch = () => {
    console.log('검색:', keyword);
  };

  const [selectedChat, setSelectedChat] = useState<ChatRoomListItemType | null>(null);

  const { data: chatRoomList } = useGetChatRoomList({});
  console.log(chatRoomList);
  // 채팅 선택 핸들러
  const handleChatSelect = (chat: ChatRoomListItemType) => {
    setSelectedChat(chat);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />

      <div className="flex h-full flex-1">
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
                key={idx}
                className={`${selectedChat == chat && 'bg-white'} flex h-20 w-full cursor-pointer items-center bg-white px-3 duration-150 hover:bg-gray-300 hover:ease-in-out`}
                onClick={() => handleChatSelect(chat)}
              >
                <ChatCard chat={chat} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex h-full w-full flex-col bg-white">
          {selectedChat ? (
            <>
              <ChatInfo
                roomId={selectedChat.chatRoomId}
                name={selectedChat.roomName}
                img={selectedChat.otherUserProfile}
              />

              <div className="sticky bottom-0 z-10 rounded-t-4xl bg-white p-4 shadow-[4px_4px_18px_10px_rgba(0,0,0,0.15)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-[3.75rem] flex-1 items-center rounded-full bg-gradient-to-r from-[#003EFB] to-[#FF00B2] p-[3px]">
                    <div className="flex h-full w-full items-center gap-3 rounded-full bg-white px-4">
                      <input
                        type="text"
                        placeholder="메시지를 입력하세요"
                        className="font-inter text -xl h-full w-full leading-[16px] font-semibold text-black placeholder-[#CCCCCC] outline-none"
                      />
                      <img src={ClipIcon} alt="클립 아이콘" className="h-6 w-6 cursor-pointer" />
                      <img
                        src={ChatSendIcon}
                        alt="전송 아이콘"
                        className="h-6 w-6 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
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
