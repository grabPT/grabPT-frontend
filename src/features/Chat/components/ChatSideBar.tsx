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

    const target = rooms.find((room) => room.otherUserId === selectedProId);
    if (target) onSelect(target);
  }, [rooms, selectedProId, selectedChatId, onSelect]);

  const closeMobileKeyboard = (): void => {
    // 현재 활성화된 요소를 찾습니다. (input, textarea 등)
    const activeElement = document.activeElement as HTMLElement;

    // 활성화된 요소가 있고, blur 메서드를 가지고 있다면 실행합니다.
    if (activeElement?.blur) {
      activeElement.blur();
    }
  };

  const filtered = useMemo(() => rooms ?? [], [rooms]);

  return (
    <aside
      className={clsx(
        'flex h-full w-[26rem] flex-col items-center border-t-1 border-r-1 border-gray-300 bg-white',
        className,
      )}
    >
      {/* 검색바 */}
      <div className="flex h-16 w-full items-center justify-center p-4">
        <div className="h-10 w-full rounded-full bg-gradient-to-r from-[#003EFB] to-[#FF00B2] p-[3px] pr-1">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-white px-4">
            <input
              type="text"
              placeholder="검색"
              className="font-inter w-full text-[13px] leading-[16px] font-semibold text-black placeholder-[#CCCCCC] outline-none"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') closeMobileKeyboard();
              }}
            />
            <SearchIcon className="h-5 w-5 text-[#CCCCCC]" onClick={closeMobileKeyboard} />
          </div>
        </div>
      </div>

      {/* 채팅방 리스트 */}
      <div className="w-full flex-1 overflow-y-auto">
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
