import type { messageType } from '@/features/Chat/types/getMessagesType';

interface NewMessageModalProps {
  latestMessage: messageType | null;
  onScrollToBottom: () => void;
}

const NewMessageModal = ({ latestMessage, onScrollToBottom }: NewMessageModalProps) => {
  if (!latestMessage) {
    return null;
  }

  return (
    <div
      className="absolute bottom-4 left-1/2 z-10 flex w-auto max-w-[90%] min-w-[200px] -translate-x-1/2 cursor-pointer items-center justify-between gap-2 rounded-full bg-blue-500 px-4 py-3 text-white shadow-lg transition-transform hover:scale-105"
      onClick={onScrollToBottom}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onScrollToBottom();
      }}
    >
      <div className="flex-1">
        <p className="w-full truncate text-center text-base">{latestMessage.content}</p>
      </div>

      {/* 아래로 스크롤 표시 아이콘 */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-5 w-5 flex-shrink-0"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    </div>
  );
};

export default NewMessageModal;
