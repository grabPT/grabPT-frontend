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
      className="absolute bottom-4 left-1/2 z-20 flex w-auto max-w-[90%] -translate-x-1/2 cursor-pointer items-center gap-3 rounded-full bg-white/90 px-5 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.15)] backdrop-blur-md transition-all hover:scale-[1.02] active:scale-95"
      onClick={onScrollToBottom}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onScrollToBottom();
      }}
    >
      <div className="flex max-w-[200px] min-w-0 flex-col">
        <span className="truncate text-sm font-medium text-gray-800">{latestMessage.content}</span>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className="h-4 w-4 text-gray-400"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    </div>
  );
};

export default NewMessageModal;
