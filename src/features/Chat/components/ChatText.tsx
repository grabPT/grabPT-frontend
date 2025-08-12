import type { messageType } from '@/features/Chat/types/getMessagesType';
import DefaultProfile from '@/features/Signup/assets/DefaultProfile.svg';
import { useUserRoleStore } from '@/store/useUserRoleStore';

interface ChatTextProps {
  chat: messageType;
}

export const ChatText = ({ chat }: ChatTextProps) => {
  const { userId } = useUserRoleStore();
  const isMe = chat.senderId === userId;
  const timeAgo = new Date(chat.sendAt).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  // 파일명 안전 추출 유틸 (경로 뒤에서부터 '.' 포함 세그먼트 탐색)
  const getFileName = (url: string) => {
    try {
      const decoded = decodeURIComponent(url);
      const segs = decoded.split('/');
      const withDot = [...segs].reverse().find((s) => s.includes('.')) ?? segs[segs.length - 1];
      // 쿼리스트링 제거
      return withDot.split('?')[0];
    } catch {
      return '파일';
    }
  };

  const renderContent = () => {
    if (chat.messageType === 'IMAGE') {
      return <img src={chat.content} alt="채팅 이미지" className="h-32 w-32 rounded-md" />;
    }
    if (chat.messageType === 'FILE') {
      const fileName = getFileName(chat.content);
      const ext = fileName.includes('.') ? fileName.split('.').pop()?.toUpperCase() : undefined;

      return (
        <a
          href={chat.content}
          target="_blank"
          rel="noopener noreferrer"
          className="flex max-w-[18rem] items-center gap-3 no-underline"
          // download 속성은 크로스도메인에서 브라우저가 무시할 수 있음. 필요 시 유지 가능.
          // download={fileName}
        >
          <div
            className={`flex h-10 w-10 flex-none items-center justify-center rounded-md ${
              isMe ? 'bg-white/20 text-white' : 'bg-black/10 text-black'
            }`}
            aria-hidden
          >
            <span className="text-xl">📎</span>
          </div>
          <div className="min-w-0">
            <div className={`truncate font-semibold ${isMe ? 'text-white' : 'text-black'}`}>
              {fileName}
            </div>
            <div className={`text-xs ${isMe ? 'text-white/80' : 'text-gray-600'}`}>
              {ext ? `${ext} 파일 열기` : '파일 열기'}
            </div>
          </div>
        </a>
      );
    }
    // 기본(TEXT)
    return <span>{chat.content}</span>;
  };

  return (
    <div
      className={`mx-3 my-2 flex w-full items-center gap-4 px-5 font-semibold ${
        isMe ? 'justify-end' : 'justify-start'
      }`}
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

      <div className="flex w-fit max-w-[70%] items-end gap-1">
        {isMe && (
          <div className="mt-2.5 flex flex-col items-end justify-end">
            {chat.readCount === 1 && (
              <span className="text-[1rem] font-bold text-[#1F56FF]">1</span>
            )}
            <span className="text-[0.875rem] font-semibold text-[#A5A5A5]">{timeAgo}</span>
          </div>
        )}

        <div
          className={`flex flex-col p-4 shadow-md ${
            isMe
              ? 'rounded-t-xl rounded-br-none rounded-bl-xl bg-[#1F56FF] text-white'
              : 'rounded-t-xl rounded-br-xl rounded-bl-none bg-[#EDEDED] text-black'
          }`}
        >
          {renderContent()}
        </div>

        {!isMe && (
          <div className="mt-2.5 flex flex-col items-center justify-end gap-2">
            <span className="text-[0.875rem] font-semibold text-[#A5A5A5]">{timeAgo}</span>
          </div>
        )}
      </div>
    </div>
  );
};
