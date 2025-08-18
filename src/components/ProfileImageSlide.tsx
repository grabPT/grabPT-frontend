import React, { useEffect, useRef, useState } from 'react';

import imageCompression from 'browser-image-compression';
import Slider from 'react-slick';

import DeleteIcon from '@/assets/images/x.png';
import { NextArrow, PrevArrow } from '@/features/home/components/CustomArrow';

export interface SlideImage {
  imageUrl: string;
  description?: string;
  file?: File;
}

interface ProfileImageSlideProps {
  title?: string;
  images: SlideImage[];
  isEditable?: boolean;
  onChange?: (next: SlideImage[]) => void;
  onCompressingChange?: (isCompressing: boolean) => void;
}

interface ProfileImageSlideCardProps {
  imgUrl: string;
  height: number;
  isEditable?: boolean;
  onDelete?: () => void;
  onPreview?: () => void;
}

const ProfileImageSlideCard = ({
  imgUrl,
  height,
  isEditable,
  onDelete,
  onPreview,
}: ProfileImageSlideCardProps) => {
  const [width, setWidth] = useState<number | null>(null);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const ratio = img.naturalWidth / img.naturalHeight;
    setWidth(height * ratio);
  };

  return (
    <div style={{ width: width ?? 'auto' }} className="relative mr-[10px]">
      {isEditable && (
        <button
          type="button"
          onClick={onDelete}
          className="absolute top-2 right-2 flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white shadow"
          aria-label="delete"
        >
          <img src={DeleteIcon} alt="Delete" />
        </button>
      )}
      <img
        src={imgUrl}
        alt="Profile"
        height={height}
        onLoad={handleImageLoad}
        style={{
          height,
          width: width ?? 'auto',
          objectFit: 'cover',
          borderRadius: '8px',
        }}
        onClick={onPreview}
        className="cursor-zoom-in"
      />
    </div>
  );
};

const ProfileImageSlide = ({
  title,
  images,
  isEditable,
  onChange,
  onCompressingChange,
}: ProfileImageSlideProps) => {
  // 편집용 로컬 상태로 복사 (prop 변경 시 동기화)
  const [list, setList] = useState<SlideImage[]>(images ?? []);
  const [isCompressing, setIsCompressing] = useState(false);

  useEffect(() => {
    onCompressingChange?.(isCompressing);
  }, [isCompressing, onCompressingChange]);

  useEffect(() => {
    if (!isEditable) {
      setList(images ?? []);
    }
  }, [images, isEditable]);

  const openInNewTab = (url: string) => {
    try {
      const w = window.open(url, '_blank', 'noopener,noreferrer');
      if (w) w.opener = null;
    } catch (e) {
      console.error('새 창 열기 실패:', e);
    }
  };

  // 파일 업로더
  const fileInputRef = useRef<HTMLInputElement>(null);
  const createdUrlsRef = useRef<string[]>([]); // createObjectURL 추적용

  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    className: 'slider variable-width',
    dots: false,
    infinite: false,
    centerMode: false,
    slidesToShow: 1,
    variableWidth: true,
    arrows: true,
    swipeToSlide: true,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    nextArrow: list.length === 0 || currentSlide >= list.length - 1 ? undefined : <NextArrow />,
    prevArrow: currentSlide === 0 ? undefined : <PrevArrow />,
  };

  const handleDelete = (idx: number) => {
    setList((prev) => {
      const removed = prev[idx];
      const next = prev.filter((_, i) => i !== idx);

      if (removed && createdUrlsRef.current.includes(removed.imageUrl)) {
        URL.revokeObjectURL(removed.imageUrl);
        createdUrlsRef.current = createdUrlsRef.current.filter((u) => u !== removed.imageUrl);
      }

      onChange?.(next); // 삭제 후 남은 모든 이미지 전달
      return next;
    });
  };

  const handleClickAdd = () => fileInputRef.current?.click();

  const handleFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    setIsCompressing(true);

    const appended: SlideImage[] = [];
    for (const file of files) {
      const compressedBlob = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });
      const compressedFile = new File([compressedBlob], file.name, { type: file.type });
      const url = URL.createObjectURL(compressedFile);
      createdUrlsRef.current.push(url);
      appended.push({ imageUrl: url, file: compressedFile });
    }

    setList((prev) => {
      const updated = [...prev, ...appended];
      onChange?.(updated); // 추가 후 전체 목록 전달
      return updated;
    });

    setIsCompressing(false);
    e.target.value = '';
  };

  // 언마운트 시 생성 URL 정리
  useEffect(() => {
    return () => {
      createdUrlsRef.current.forEach((u) => URL.revokeObjectURL(u));
      createdUrlsRef.current = [];
    };
  }, []);

  return (
    <div className="flex h-[300px] w-full flex-col">
      {title && <h2 className="mb-4 text-xl font-semibold">{title}</h2>}

      <Slider key={list.length} {...settings}>
        {list
          .filter((it) => !!it?.imageUrl)
          .map(({ imageUrl }, idx) => (
            <ProfileImageSlideCard
              key={`${imageUrl}-${idx}`}
              imgUrl={imageUrl}
              height={200}
              isEditable={!!isEditable}
              onDelete={() => handleDelete(idx)}
              onPreview={() => openInNewTab(imageUrl)}
            />
          ))}
      </Slider>

      {isEditable && (
        <div className="mt-[20px] mb-3 flex w-full items-center justify-center gap-2">
          {isCompressing ? (
            // 압축 로딩 UI
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                className="h-5 w-5 animate-spin text-[#003EFB]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              <span>이미지 압축 중...</span>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={handleClickAdd}
                className="cursor-pointer rounded-[10px] bg-[#003EFB] px-4 py-2 text-white hover:bg-blue-700"
              >
                이미지 추가
              </button>
              {/* 숨겨진 파일 입력 */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFilesSelected}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileImageSlide;
