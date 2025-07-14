import { MenuIcon, SearchIcon } from 'lucide-react';

import Profile from '@/assets/images/Profile.png';
import { ChatText } from '@/features/Chat/components/ChatText';
import { dummyMessages } from '@/features/Chat/types/chat';

interface ChatInfoProps {
  id: string;
  name: string;
  location: string;
  img: string;
}

export const ChatInfo = ({ id, name, location, img }: ChatInfoProps) => {
  //선택된 채팅 정보로 세부 채팅 기록 받아오는 로직 추가 예정
  const messageResponse = dummyMessages;

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center justify-between bg-gradient-to-r from-[#003EFB] to-[#FF00B2] px-5">
        <div className="flex items-center justify-start gap-3">
          <img src={Profile} alt={name} className="h-12 w-12 rounded-full" />
          <span className="text-[1rem] font-extrabold">
            {location} {name}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <SearchIcon className="h-5 w-5 text-white" />
          <MenuIcon className="h-5 w-5 text-white" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-3">
        {messageResponse.map((message) => (
          <div key={message.id} className="flex flex-col items-center gap-2">
            <ChatText
              id={message.id}
              senderId={message.senderId}
              message={message.message}
              timestamp={new Date(message.timestamp)}
              type={message.type}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
