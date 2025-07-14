import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

import DefaultProfile from '@/features/Signup/assets/DefaultProfile.svg'
interface ChatTextProps {
  id: string;
  senderId: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'image';
}

export const ChatText = ({ senderId, message, timestamp, type }: ChatTextProps) => {
  const isMe = senderId === 'me';
  const timeAgo = formatDistanceToNow(timestamp, {
    addSuffix: true,
    locale: ko,
  });
  return (
<div className={`w-full px-5 flex gap-4 mx-3 my-2 font-semibold items-center ${isMe ? 'justify-end' : 'justify-start'}`}>
  {!isMe && (
    <div className='self-end'>
    <img src={DefaultProfile} alt="프로필 이미지" className="h-12 w-12 rounded-full items-end" />
    </div>
  )}
<div
  className={`flex w-fit max-w-[70%] flex-col p-4 shadow-md ${
    isMe
      ? 'bg-gradient-to-r from-[#003EFB] to-[#FF00B2] text-white rounded-t-xl rounded-bl-xl rounded-br-none'
      : 'bg-[#EDEDED] text-black rounded-t-xl rounded-br-xl rounded-bl-none'
  }`}
>
    {type === 'image' ? (
      <img src={message} alt="채팅 이미지" className="h-32 w-32 rounded-md" />
    ) : (
      <span>{message}</span>
    )}
    <span className="mt-2.5 font-normal text-right text-xs">{timeAgo}</span>
  </div>
</div>
  );
};
