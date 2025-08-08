import { useRef, useState } from 'react';

import 이미지등록이미지 from '@/assets/images/이미지등록.svg';

interface PreviewImage {
  id: string;
  url: string;
}

interface ImageUploaderProps {
  onChange: (files: File[]) => void;
}

export default function ImageUploader({ onChange }: ImageUploaderProps) {
  const [images, setImages] = useState<PreviewImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /** + 타일 클릭 → 숨겨진 file input 열기 */
  const handleClickAdd = () => fileInputRef.current?.click();

  /** 파일 선택 → 미리보기 URL 생성 후 상태에 누적 */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const previews = files.map((file) => ({
      id: crypto.randomUUID(),
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...previews]);
    onChange(files);
    e.target.value = ''; // 같은 파일 재선택 가능하도록 초기화
  };

  /** 미리보기 삭제 */
  const handleRemove = (id: string) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((img) => img.id !== id);
    });
  };

  return (
    <div className="mt-3.5 grid grid-cols-5 gap-4">
      {/* 항상 노출되는 + 타일 */}
      <img
        src={이미지등록이미지}
        alt="이미지등록"
        onClick={handleClickAdd}
        className="aspect-square h-full cursor-pointer"
      />
      {/* 미리보기 섬네일 */}
      {images.map(({ id, url }) => (
        <div key={id} className="relative aspect-square">
          <img src={url} alt="업로드 미리보기" className="h-full w-full rounded-lg object-cover" />
          <button
            type="button"
            onClick={() => handleRemove(id)}
            className="absolute top-1 right-1 rounded-full bg-black/60 px-1 text-xs text-white"
          >
            ×
          </button>
        </div>
      ))}

      {/* 숨겨진 파일 입력 */}
      <input
        ref={fileInputRef}
        aria-label="새로운 사진"
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
