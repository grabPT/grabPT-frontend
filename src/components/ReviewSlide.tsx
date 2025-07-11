import { useRef } from 'react';

import ArrowRight from '@/assets/images/Arrow-Right.png';
import ReviewCard from '@/components/ReviewCard';

export type Review = {
  name: string;
  location: string;
  rating: number;
  content: string;
};

interface ReviewSlideProps {
  title: string;
  reviews: Review[];
}

const ReviewSlide = ({ title, reviews }: ReviewSlideProps) => {
  const CARD_WIDTH = 310;
  const GAP = 30;
  const STEP = CARD_WIDTH + GAP;

  const trackRef = useRef<HTMLDivElement>(null);

  const next = () => trackRef.current?.scrollBy({ left: STEP, behavior: 'smooth' });

  return (
    <section className="w-full">
      {/* 타이틀 */}
      <h2 className="mb-4 text-[33px] font-semibold">{title}</h2>
      <hr className="mb-6 border-t border-[#d9d9d9]" />

      {/* 슬라이더 */}
      <div className="relative">
        {/* 뷰포트 */}
        <div ref={trackRef} className="overflow-x-hidden scroll-smooth">
          {/* 트랙 */}
          <div className="flex w-max gap-[30px]">
            {reviews.map((rv, idx) => (
              <div className="w-[310px]" key={idx}>
                <ReviewCard {...rv} />
              </div>
            ))}
          </div>
        </div>

        {/* 우측 페이드 */}
        <div className="pointer-events-none absolute top-0 right-0 h-full w-1/6 bg-gradient-to-l from-white to-transparent" />

        {/* 화살표 */}
        <button onClick={next} className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer">
          <img src={ArrowRight} alt="next" className="w-[60px]" />
        </button>
      </div>
    </section>
  );
};

export default ReviewSlide;
