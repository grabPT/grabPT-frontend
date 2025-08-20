import clsx from 'clsx';

import type { messageType } from '@/features/Chat/types/getMessagesType';
import { useRoleStore } from '@/store/useRoleStore';
import { onErrorImage } from '@/utils/onErrorImage';

interface ChatTextProps {
  chat: messageType;
  imageUrl: string;
}

export const ChatText = ({ chat, imageUrl }: ChatTextProps) => {
  const { userId } = useRoleStore();
  const isMe = chat.senderId === userId;
  const isImage = chat.messageType === 'IMAGE';
  const isFile = chat.messageType === 'FILE';
  const timeAgo = new Date(chat.sendAt).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const getFileName = (url: string) => {
    try {
      const decoded = decodeURIComponent(url);
      const segs = decoded.split('/');
      const withDot = [...segs].reverse().find((s) => s.includes('.')) ?? segs[segs.length - 1];
      return withDot.split('?')[0];
    } catch {
      return '파일';
    }
  };

  const renderContent = () => {
    if (isImage) {
      const full = chat.content;
      return (
        <a
          href={full}
          target="_blank"
          rel="noopener noreferrer"
          className="block max-w-[min(60vw,420px)]"
        >
          <img
            src={full}
            alt="채팅 이미지"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={onErrorImage}
            className="h-auto max-h-[60vh] w-full rounded-md object-contain"
          />
        </a>
      );
    }

    if (isFile) {
      const fileName = getFileName(chat.content);
      const ext = fileName.includes('.') ? fileName.split('.').pop()?.toUpperCase() : undefined;

      return (
        <a
          href={chat.content}
          target="_blank"
          rel="noopener noreferrer"
          className="flex max-w-[18rem] items-center gap-3 no-underline"
        >
          <div
            className={clsx(
              'flex h-10 w-10 flex-none items-center justify-center rounded-md',
              isMe ? 'bg-white/20 text-white' : 'bg-black/10 text-black',
            )}
            aria-hidden
          >
            <span className="text-xl">📎</span>
          </div>
          <div className="min-w-0">
            <div className={clsx('truncate font-semibold', isMe ? 'text-white' : 'text-black')}>
              {fileName}
            </div>
            <div className={clsx('text-xs', isMe ? 'text-white/80' : 'text-gray-600')}>
              {ext ? `${ext} 파일 열기` : '파일 열기'}
            </div>
          </div>
        </a>
      );
    }

    return <span>{chat.content}</span>;
  };

  return (
    <div
      className={clsx(
        'mx-3 my-2 flex w-full items-center gap-4 px-5 font-semibold',
        isMe ? 'justify-end' : 'justify-start',
      )}
    >
      {!isMe && (
        <img
          src={imageUrl}
          onError={onErrorImage}
          alt="프로필 이미지"
          className="h-12 w-12 self-end rounded-full"
        />
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
          className={clsx(
            'flex flex-col shadow-md',
            // 이미지일 때는 padding 0, bg-white
            isImage ? 'bg-white p-0' : 'p-4',
            isMe
              ? 'rounded-t-xl rounded-br-none rounded-bl-xl bg-[#1F56FF] text-white'
              : 'rounded-t-xl rounded-br-xl rounded-bl-none bg-[#EDEDED] text-black',
          )}
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
