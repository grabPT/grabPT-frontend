import { useLayoutEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import SlideArrow from '@/components/SlideArrow';

interface ImageSlideProps {
  title: string;
  images: string[];
}

const VISIBLE = 3; // 항상 3장
const GAP_PX = 24; // gap-6

const CARD_CLASS = 'basis-[calc((100%_-_48px)_/_3)] w-[calc((100%_-_48px)_/_3)]';

// 사진슬라이드
// 구현하다보니까 요구사항이 많아지고 좀 복잡하네요... 모바일까지 고려하면 라이브러리 도입이 어떤가 싶습니다 ㅜ
const ImageSlide = ({ images }: ImageSlideProps) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [startIdx, setStartIdx] = useState(0);
  const [cardStepPx, setCardStepPx] = useState(0); // 카드 1장 + gap 실제 px
  const maxStart = Math.max(images.length - VISIBLE, 0);

  const canPrev = startIdx > 0;
  const canNext = startIdx < maxStart;

  // 카드 실제 px 측정
  const measure = () => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.children[0] as HTMLElement | undefined;
    if (!first) return;
    const w = first.getBoundingClientRect().width;
    // gap 읽기
    const gap = parseFloat(getComputedStyle(track).columnGap || '0') || GAP_PX;
    setCardStepPx(w + gap);
  };

  // 레이아웃 변화 시 다시 측정
  useLayoutEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // 인덱스 변화 시 자동 클램프 (이미지 배열 길이 바뀔 때 대비)
  useLayoutEffect(() => {
    setStartIdx((i) => Math.min(i, maxStart));
  }, [maxStart]);

  const goPrev = () => canPrev && setStartIdx((i) => i - 1);
  const goNext = () => canNext && setStartIdx((i) => i + 1);

  // 이동 px 계산
  const translate = -(startIdx * cardStepPx);

  return (
    <section className="w-full">
      <div className="relative">
        {/* 뷰포트 마스크 */}
        <div className="overflow-hidden">
          {/* 트랙 */}
          {/* 인라인 스타일 경고가 뜨는데 라이브러리 도입예정이기 때문에 냅두겠습니다 */}
          <div
            ref={trackRef}
            className="flex gap-6 transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(${translate}px)` }}
          >
            {images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`소개사진 ${idx + 1}`}
                className={clsx('flex-shrink-0 rounded-md object-cover', CARD_CLASS)}
              />
            ))}
          </div>
        </div>

        {/* 화살표 */}
        <SlideArrow isLeft onClick={goPrev} disabled={!canPrev} aria-label="이전" />
        <SlideArrow onClick={goNext} disabled={!canNext} aria-label="다음" />
      </div>
    </section>
  );
};

export default ImageSlide;
