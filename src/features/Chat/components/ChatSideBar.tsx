import { useEffect, useState } from 'react';

import clsx from 'clsx';

import SearchIcon from '@/assets/icons/SearchIcon';
import ChatCard from '@/features/Chat/components/ChatCard';
import SkeletonChatCard from '@/features/Chat/components/SkeletonChatCard';
import { useGetChatRoomList } from '@/features/Chat/hooks/useGetChatRoomList';
import type { ChatRoomListItemType } from '@/features/Chat/types/getChatRoomListType';
import { useDebounce } from '@/hooks/useDebounce';

interface ChatSideBarProps {
  selectedChatId?: number | null;
  onSelect: (chat: ChatRoomListItemType) => void;
  selectedProId?: number;
}

export const ChatSideBar = ({
  selectedChatId = null,
  onSelect,
  selectedProId,
}: ChatSideBarProps) => {
  const [keyword, setKeyword] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');

  const debouncedSearch = useDebounce((value: string) => {
    setKeyword(value);
  }, 300);

  const { data: rooms, isPending } = useGetChatRoomList({ keyword });

  // rooms가 undefined일 경우 빈 배열 처리
  const chatList = rooms ?? [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  // 특정 전문가와 매칭되는 채팅방 자동 선택 로직 (전문가 상세페이지에서 채팅하기 눌렀을 때)
  useEffect(() => {
    if (!rooms || !selectedProId || selectedChatId) return;

    const target = rooms.find((room) => room.otherUserId === selectedProId);
    if (target) onSelect(target);
  }, [rooms, selectedProId, selectedChatId, onSelect]);

  return (
    <aside className="flex h-full w-[26rem] flex-col items-center border-t border-r border-gray-300 bg-white">
      {/* 검색바 */}
      <div className="flex w-full items-center justify-center p-4">
        <div className="flex h-11 w-full items-center rounded-2xl bg-[#F0F2F5] px-3.5 transition-colors focus-within:bg-[#EAECEF]">
          <SearchIcon className="mr-2 h-5 w-5 text-[#8B95A1]" strokeWidth={2} />
          <input
            type="text"
            placeholder="검색"
            className="w-full bg-transparent text-[15px] leading-none font-medium text-[#333D4B] placeholder-[#8B95A1] outline-none"
            value={inputValue}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* 채팅방 리스트 영역 */}
      <div className="w-full flex-1 overflow-y-auto">
        {/* 1. 로딩 중 (스켈레톤) */}
        {isPending && (
          <div className="flex flex-col">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonChatCard key={i} />
            ))}
          </div>
        )}

        {/* 2. 검색 결과 없음 or 채팅방 없음 */}
        {!isPending && chatList.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center text-gray-400">
            <span>채팅방이 없습니다.</span>
            <span className="mt-1">전문가와 대화를 시작해보세요 💬</span>
          </div>
        )}

        {/* 3. 리스트 렌더링 */}
        {!isPending &&
          chatList.map((chat) => {
            const isSelected = selectedChatId === chat.roomId;
            return (
              <button
                type="button"
                key={chat.roomId}
                onClick={() => onSelect(chat)}
                className={clsx(
                  'flex h-20 w-full cursor-pointer items-center px-3 text-left transition-colors duration-150',
                  isSelected ? 'bg-gray-200' : 'bg-white hover:bg-gray-100',
                )}
              >
                <ChatCard chat={chat} />
              </button>
            );
          })}
      </div>
    </aside>
  );
};

export default ChatSideBar;
