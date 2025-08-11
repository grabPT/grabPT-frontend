import { memo, useCallback, useState } from 'react';

import ChatSendIcon from '@/features/Chat/assets/ChatSendIcon.svg';
import ClipIcon from '@/features/Chat/assets/ClipIcon.svg';

type Props = {
  onSend: (text: string) => void;
};

export const MessageInput = memo(function MessageInput({ onSend }: Props) {
  const [text, setText] = useState('');

  const handleSend = useCallback(() => {
    const body = text.trim();
    if (!body) return;
    onSend(body);
    setText('');
  }, [text, onSend]);

  return (
    <div className="sticky bottom-0 z-10 rounded-t-4xl bg-white p-4 shadow-[4px_4px_18px_10px_rgba(0,0,0,0.15)]">
      <div className="flex items-center gap-3">
        <div className="flex h-[3.75rem] flex-1 items-center rounded-full bg-gradient-to-r from-[#003EFB] to-[#FF00B2] p-[3px]">
          <div className="flex h-full w-full items-center gap-3 rounded-full bg-white px-4">
            <input
              type="text"
              placeholder="메시지를 입력하세요"
              className="font-inter text -xl h-full w-full leading-[16px] font-semibold text-black placeholder-[#CCCCCC] outline-none"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <img src={ClipIcon} alt="클립 아이콘" className="h-6 w-6 cursor-pointer" />
            <img
              src={ChatSendIcon}
              alt="전송 아이콘"
              className="h-6 w-6 cursor-pointer"
              onClick={handleSend}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
