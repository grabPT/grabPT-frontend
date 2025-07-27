import { ChatText } from '@/features/Chat/components/ChatText';
import { dummyMessages } from '@/features/Chat/types/chat';
import DefaultProfile from '@/features/Signup/assets/DefaultProfile.svg';

interface ChatInfoProps {
  name: string;
  location: string;
  img: string;
}

export const ChatInfo = ({ name, location, img }: ChatInfoProps) => {
  //선택된 채팅 정보로 세부 채팅 기록 받아오는 로직 추가 예정
  const messageResponse = dummyMessages;

  const isDifferentDay = (prev: Date | null, curr: Date) => {
    if (!prev) return true;
    return (
      prev.getFullYear() !== curr.getFullYear() ||
      prev.getMonth() !== curr.getMonth() ||
      prev.getDate() !== curr.getDate()
    );
  };
  return (
    <div className="flex h-full flex-col pb-40">
      <div className="flex h-14 items-center justify-between bg-[#1F56FF] px-5">
        <div className="flex items-center justify-start gap-3">
          <img src={DefaultProfile} alt={name} className="h-9 w-9 rounded-full" />
          <span className="text-[1rem] font-extrabold text-white">
            {location} {name}
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-3">
        {messageResponse.map((message, index) => {
          const currentDate = new Date(message.timestamp);
          const prevDate = index > 0 ? new Date(messageResponse[index - 1].timestamp) : null;
          const shouldShowDate = isDifferentDay(prevDate, currentDate);

          return (
            <div key={message.id} className="flex flex-col items-center gap-2">
              {shouldShowDate && (
                <div className="my-2 text-sm text-gray-500">
                  {currentDate.toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    weekday: 'short',
                  })}
                </div>
              )}
              <ChatText
                id={message.id}
                senderId={message.senderId}
                message={message.message}
                timestamp={new Date(message.timestamp)}
                type={message.type}
                isRead={message.isRead}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
