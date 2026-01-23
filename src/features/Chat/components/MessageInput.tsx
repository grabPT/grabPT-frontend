import { memo, useCallback, useRef, useState } from 'react';

import ChatSendIcon from '@/features/Chat/assets/ChatSendIcon.svg';
import ClipIcon from '@/features/Chat/assets/ClipIcon.svg';
import { compressImage } from '@/utils/imageCompression';

interface MessageInputProps {
  onSend: (text: string) => void;
  pendingFile: File | null;
  onFileSelect?: (file: File | null) => void;
  onSendFile?: (file: File) => void; // ← 추가
  sending?: boolean; // ← 선택: 전송 중 버튼 잠금
}

const MessageInput = ({ onSend, onFileSelect, onSendFile, sending = false }: MessageInputProps) => {
  const [text, setText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFilePick = useCallback(() => {
    if (!sending) fileInputRef.current?.click();
  }, [sending]);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target;
      const f = input.files?.[0];
      if (!f) return;

      // 이미지 여부(+ GIF / SVG는 제외)
      const mime = f.type.toLowerCase();
      const isImage = mime.startsWith('image/') && !mime.includes('gif') && !mime.includes('svg');

      try {
        if (isImage) {
          const compressed = await compressImage(f, { maxSizeMB: 1 });
          console.log('compressed', compressed);
          setSelectedFile(compressed);
          onFileSelect?.(compressed); // ← 이미지면 압축본을 전달
        } else {
          setSelectedFile(f);
          onFileSelect?.(f); // ← 비이미지면 원본 그대로
        }
      } catch (err) {
        console.error(err);
        // 실패 시 원본이라도 유지하고 싶다면 아래 주석 해제
        // setSelectedFile(f);
        // onFileSelect?.(f);
      } finally {
        // 같은 파일 재선택 가능하게 초기화
        input.value = '';
      }
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
    <div className="sticky bottom-0 z-10 w-full bg-white pt-2 pb-6">
      {/* 파일 미리보기 영역 */}
      {selectedFile && (
        <div className="mx-6 mb-3 flex items-center gap-2 text-sm text-gray-600">
          <div className="flex max-w-[80%] items-center gap-2 rounded-xl bg-gray-100 px-3 py-2">
            <span className="truncate font-medium">{selectedFile.name}</span>
            <span className="text-xs whitespace-nowrap text-gray-400">
              ({formatBytes(selectedFile.size)})
            </span>
          </div>
          <button
            type="button"
            onClick={clearFile}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 disabled:opacity-50"
            disabled={sending}
          >
            ×
          </button>
        </div>
      )}

      {/* 입력 영역 */}
      <div className="mx-5 flex items-end gap-2">
        <div className="flex min-h-[3.25rem] flex-1 items-center gap-3 rounded-[24px] bg-[#F0F2F5] px-5 py-2 transition-colors focus-within:bg-[#EAECEF]">
          <img
            src={ClipIcon}
            alt="파일 첨부"
            className={`h-6 w-6 cursor-pointer opacity-50 transition-opacity hover:opacity-100 ${
              sending ? 'pointer-events-none' : ''
            }`}
            onClick={triggerFilePick}
          />

          <input
            type="text"
            placeholder={selectedFile ? '파일에 대한 메시지 입력' : '메시지 보내기'}
            className="h-full w-full bg-transparent text-[16px] leading-normal font-medium text-[#333D4B] placeholder-[#8B95A1] outline-none disabled:opacity-60"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) =>
              !selectedFile && e.key === 'Enter' && !e.nativeEvent.isComposing && handleSend()
            }
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
        </div>

        {/* 전송 버튼 (독립형) */}
        <button
          type="button"
          onClick={handleSend}
          disabled={(!text && !selectedFile) || sending}
          className={`flex h-[3.25rem] w-[3.25rem] flex-shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
            (!text && !selectedFile) || sending
              ? 'cursor-not-allowed bg-gray-200'
              : 'bg-grabpt shadow-md hover:bg-blue-600 active:scale-95'
          }`}
        >
          <img
            src={ChatSendIcon}
            alt="전송"
            className={`h-6 w-6 ${(!text && !selectedFile) || sending ? 'opacity-40' : 'brightness-30 invert'}`}
          />
        </button>
      </div>
    </div>
  );
};

export default memo(MessageInput);
