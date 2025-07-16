import ReadIcon from '@/features/Chat/assets/ReadIcon.svg';
import DefaultProfile from '@/features/Signup/assets/DefaultProfile.svg';

interface ChatTextProps {
  id: string;
  senderId: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'image';
  isRead: boolean;
}

export const ChatText = ({ senderId, message, timestamp, type, isRead }: ChatTextProps) => {
  const isMe = senderId === 'me';
  const timeAgo = new Date(timestamp).toLocaleTimeString('ko-KR', {
  hour: '2-digit',
  minute: '2-digit',
})
  return (
    <div
      className={`mx-3 my-2 flex w-full items-center gap-4 px-5 font-semibold ${isMe ? 'justify-end' : 'justify-start'}`}
    >
      {!isMe && (
        <div className="self-end">
          <img
            src={DefaultProfile}
            alt="프로필 이미지"
            className="h-12 w-12 items-end rounded-full"
          />
        </div>
      )}
      <div className="flex w-fit max-w-[70%] flex-col">
        <div
          className={`flex flex-col p-4 shadow-md ${
            isMe
              ? 'rounded-t-xl rounded-br-none rounded-bl-xl bg-[#1F56FF] text-white'
              : 'rounded-t-xl rounded-br-xl rounded-bl-none bg-[#EDEDED] text-black'
          }`}
        >
          {type === 'image' ? (
            <img src={message} alt="채팅 이미지" className="h-32 w-32 rounded-md" />
          ) : (
            <span>{message}</span>
          )}
        </div>
        <div className="mt-2.5 flex items-center justify-end gap-2">
          <span className="text-xs font-normal">{timeAgo}</span>
          {isMe && isRead && (
            <span>
              {' '}
              <img src={ReadIcon} alt="읽음 표시" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
