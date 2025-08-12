// MessageInput.tsx
import { memo, useCallback, useRef, useState } from 'react';

import ChatSendIcon from '@/features/Chat/assets/ChatSendIcon.svg';
import ClipIcon from '@/features/Chat/assets/ClipIcon.svg';

type Props = {
  onSend: (text: string) => void;
  pendingFile: File | null;
  onFileSelect?: (file: File | null) => void;
  onSendFile?: (file: File) => void; // ← 추가
  sending?: boolean; // ← 선택: 전송 중 버튼 잠금
};

export const MessageInput = memo(function MessageInput({
  onSend,
  onFileSelect,
  onSendFile,
  sending = false,
}: Props) {
  const [text, setText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFilePick = useCallback(() => {
    if (!sending) fileInputRef.current?.click();
  }, [sending]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      setSelectedFile(file);
      onFileSelect?.(file);
      e.currentTarget.value = '';
    },
    [onFileSelect],
  );

  const clearFile = useCallback(() => {
    if (sending) return;
    setSelectedFile(null);
    onFileSelect?.(null);
  }, [onFileSelect, sending]);

  const handleSend = useCallback(() => {
    if (sending) return;

    // 파일이 있으면 파일 업로드 호출
    if (selectedFile) {
      onSendFile?.(selectedFile);
      // 내부/부모 상태 모두 초기화
      setSelectedFile(null);
      onFileSelect?.(null);
      return;
    }

    // 평소처럼 텍스트 전송
    const body = text.trim();
    if (!body) return;
    onSend(body);
    setText('');
  }, [sending, selectedFile, onSendFile, onFileSelect, text, onSend]);

  const formatBytes = (n: number) => {
    if (n < 1024) return `${n} B`;
    const kb = n / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <div className="sticky bottom-0 z-10 rounded-t-4xl bg-white p-4 shadow-[4px_4px_18px_10px_rgba(0,0,0,0.15)]">
      {selectedFile && (
        <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
          <span className="max-w-[60%] truncate rounded-full border px-3 py-1">
            {selectedFile.name} ({formatBytes(selectedFile.size)})
          </span>
          <button
            type="button"
            onClick={clearFile}
            className="rounded-full border px-2 leading-none text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            disabled={sending}
          >
            ×
          </button>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="flex h-[3.75rem] flex-1 items-center rounded-full bg-gradient-to-r from-[#003EFB] to-[#FF00B2] p-[3px]">
          <div className="flex h-full w-full items-center gap-3 rounded-full bg-white px-4">
            <input
              type="text"
              placeholder={selectedFile ? '파일 전송 모드' : '메시지를 입력하세요'}
              className="font-inter h-full w-full text-xl leading-[16px] font-semibold text-black placeholder-[#CCCCCC] outline-none disabled:opacity-60"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => !selectedFile && e.key === 'Enter' && handleSend()}
              disabled={Boolean(selectedFile) || sending}
            />

            <input
              aria-label="파일"
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*,application/pdf,application/zip,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
            />

            <img
              src={ClipIcon}
              alt="클립 아이콘"
              className={`h-6 w-6 cursor-pointer ${sending ? 'pointer-events-none opacity-40' : ''}`}
              onClick={triggerFilePick}
            />

            <img
              src={ChatSendIcon}
              alt="전송 아이콘"
              className={`h-6 w-6 cursor-pointer ${sending ? 'pointer-events-none opacity-40' : ''}`}
              onClick={handleSend}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
