import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

import type { ChatRoomListItemType } from '@/features/Chat/types/getChatRoomListType';
import { onErrorImage } from '@/utils/onErrorImage';

interface ChatCardProps {
  chat: ChatRoomListItemType;
}

const ChatCard = ({ chat }: ChatCardProps) => {
  const timeAgo = formatDistanceToNow(chat.lastMessageTime, {
    addSuffix: true,
    locale: ko,
  });

  return (
    <div className="flex w-full justify-center gap-3">
      <img
        src={chat.otherUserProfile}
        onError={onErrorImage}
        alt="chat profile"
        className="h-12 w-12 rounded-full"
      />
      {/* {img}
      </img> */}
      <div className="flex h-12 w-full max-w-3/4 flex-col justify-start gap-2">
        <div className="text-[1rem] font-extrabold">{chat.roomName}</div>
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
