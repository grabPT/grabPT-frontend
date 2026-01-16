import ProfileImage from '@/components/ProfileImage';
import type { ChatRoomListItemType } from '@/features/Chat/types/getChatRoomListType';
import { formatTimeAgo } from '@/utils/formatTimeAgo';

interface ChatCardProps {
  chat: ChatRoomListItemType;
}

const ChatCard = ({ chat }: ChatCardProps) => {
  const timeAgo = formatTimeAgo(chat.lastMessageTime);

  return (
    <div className="flex w-full justify-between gap-3 px-2">
      {/* 프로필사진 */}
      <div className="h-12 w-12 min-w-12 overflow-hidden rounded-full">
        <ProfileImage src={chat.otherUserProfileImageUrl} alt="프로필사진" />
      </div>

      <div className="flex h-12 min-w-0 flex-1 flex-col justify-between">
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
          <div className="min-w-0 flex-1 truncate overflow-hidden text-[0.875rem] font-bold whitespace-nowrap text-[#A6A6A6]">
            {chat.lastMessage}
          </div>
          <div className="flex shrink-0 items-end text-xs font-bold whitespace-nowrap text-[#A6A6A6]">
            {timeAgo}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
