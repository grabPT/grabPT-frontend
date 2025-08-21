import { useEffect, useMemo, useState } from 'react';

import clsx from 'clsx';
import { SearchIcon } from 'lucide-react';

import ChatCard from '@/features/Chat/components/ChatCard';
import { useGetChatRoomList } from '@/features/Chat/hooks/useGetChatRoomList';
import type { ChatRoomListItemType } from '@/features/Chat/types/getChatRoomListType';

interface ChatSideBarProps {
  selectedChatId?: number | null;
  onSelect: (chat: ChatRoomListItemType) => void;
  className?: string;
  selectedProId?: number; // ✅ optional로
}

export const ChatSideBar = ({
  selectedChatId = null,
  onSelect,
  className,
  selectedProId,
}: ChatSideBarProps) => {
  const [keyword, setKeyword] = useState('');
  const { data: rooms } = useGetChatRoomList({ keyword });

  // ✅ rooms or selectedProId가 준비되면 자동 선택
  useEffect(() => {
    if (!rooms || !rooms.length) return;
    if (!selectedProId) return;
    if (selectedChatId) return; // 이미 선택되어 있으면 패스

    const target = rooms.find((room) => room.userId === selectedProId);
    if (target) onSelect(target);
  }, [rooms, selectedProId, selectedChatId, onSelect]);

  const filtered = useMemo(() => rooms ?? [], [rooms]);

  return (
    <aside
      className={clsx(
        'flex h-full w-[26.125rem] flex-col items-center border-t-1 border-r-1 border-gray-300 bg-white',
        className,
      )}
    >
      {/* 검색바 */}
      <div className="sticky top-[70px] z-10 w-[22rem] bg-white pt-3">
        <div className="h-10 w-full rounded-full bg-gradient-to-r from-[#003EFB] to-[#FF00B2] p-[3px]">
          <div className="flex h-full w-full items-center rounded-full bg-white px-[16px] pr-[15px]">
            <input
              type="text"
              placeholder="검색"
              className="font-inter w-full text-[13px] leading-[16px] font-semibold text-black placeholder-[#CCCCCC] outline-none"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') console.log('검색:', keyword);
              }}
            />
            <SearchIcon className="h-5 w-5 text-[#CCCCCC]" />
          </div>
        </div>
      </div>

      {/* 채팅방 리스트 */}
      <div className="w-full flex-1 overflow-y-auto pt-5">
        {filtered.map((chat) => {
          const isSelected = selectedChatId === chat.chatRoomId;
          return (
            <button
              type="button"
              key={chat.chatRoomId}
              className={clsx(
                'flex h-20 w-full cursor-pointer items-center px-3 text-left duration-150 hover:bg-gray-300 hover:ease-in-out',
                isSelected ? 'bg-gray-200' : 'bg-white',
              )}
              onClick={() => onSelect(chat)}
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
