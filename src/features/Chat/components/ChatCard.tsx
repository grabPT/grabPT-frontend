import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

import ProfileImage from '@/components/ProfileImage';
import type { ChatRoomListItemType } from '@/features/Chat/types/getChatRoomListType';

interface ChatCardProps {
  chat: ChatRoomListItemType;
}

const ChatCard = ({ chat }: ChatCardProps) => {
  const timeAgo = formatDistanceToNow(chat.lastMessageTime, {
    addSuffix: true,
    locale: ko,
  });

  return (
    <div className="flex w-full justify-between gap-3 px-2">
      {/* 프로필사진 */}
      <div className="h-12 w-12 min-w-12 overflow-hidden rounded-full">
        <ProfileImage src={chat.otherUserProfileImageUrl} alt="프로필사진" />
      </div>

      {/* 채팅방정보 */}
      <div className="flex h-12 w-full flex-col justify-between">
        {/* 방이름 && 안 읽은 개수 */}
        <div className="flex justify-between">
          <div className="text-[1rem] font-extrabold">{chat.roomName}</div>
          {chat.unreadCount > 0 && (
            <div className="flex items-center rounded-full bg-red-500 px-2 text-center text-[0.75rem] font-extrabold text-white">
              {chat.unreadCount}
            </div>
          )}
        </div>
        {/* 최신대화 & 날짜 */}
        <div className="flex items-center justify-between gap-2">
          <div className="truncate overflow-hidden text-[0.875rem] font-bold whitespace-nowrap text-[#A6A6A6]">
            {chat.lastMessage}
          </div>
          <div className="flex items-end text-xs font-bold whitespace-nowrap text-[#A6A6A6]">
            {timeAgo}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
