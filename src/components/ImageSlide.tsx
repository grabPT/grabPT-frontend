import { useRef } from 'react';

import ArrowRight from '@/assets/images/Arrow-Right.png';

// 디자인 변경 시 일괄적으로 변경예정
interface ImageSlideProps {
  title: string;
  images: string[]; // 썸네일 URL 배열
}

const ImageSlide = ({ title, images }: ImageSlideProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleNext = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: 363 + 30, behavior: 'smooth' });
  };

  return (
    <section className="w-full">
      {/* 타이틀 */}
      <h2 className="mb-4 text-[33px] font-semibold">{title}</h2>
      <hr className="mb-6 border-t border-[#d9d9d9]" />

      {/* 슬라이더 - 추후 변경 */}
      <div className="relative">
        <div ref={scrollRef} className="overflow-hidden scroll-smooth">
          {/* 트랙 — 카드 총합만큼 가로 길이 확장 */}
          <div className="flex w-max gap-[31px]">
            {images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`소개사진 ${idx + 1}`}
                className="h-[212px] w-[363px] flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* 우측 페이드*/}
        <div className="pointer-events-none absolute top-0 right-0 h-full w-1/6 bg-gradient-to-l from-white to-transparent" />

        {/* 화살표 */}
        <div
          onClick={handleNext}
          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
        >
          <img src={ArrowRight} alt="image-slide-next " className="w-[60px]" />
        </div>
      </div>
    </section>
  );
};

export default ImageSlide;
