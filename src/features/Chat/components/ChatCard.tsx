import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

import DefaultProfile from '@/features/Signup/assets/DefaultProfile.svg';

interface ChatCardProps {
  // img: string;
  name: string;
  location: string;
  time: Date;
  text: string;
}

const ChatCard = ({ name, location, time, text }: ChatCardProps) => {
  const timeAgo = formatDistanceToNow(time, {
    addSuffix: true,
    locale: ko,
  });

  return (
    <div className="flex w-full justify-center gap-3">
      <img src={DefaultProfile} alt="chat profile" className="h-12 w-12 rounded-full" />
      {/* {img}
      </img> */}
      <div className="flex h-12 w-full max-w-3/4 flex-col justify-start gap-2">
        <div className="text-[1rem] font-extrabold">
          {location} {name}
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="truncate overflow-hidden text-[0.875rem] font-bold whitespace-nowrap text-[#A6A6A6]">
            {text}
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
