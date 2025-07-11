import React, { useEffect, useRef, useState } from 'react';

import ExpertProfileCard from '@/features/Category/components/ExpertProfileCard';
import type { ExpertCardProps } from '@/features/Category/types/ExpertCardProps';
import ArrowRight from '@/features/home/assets/icons/ArrowRight';

interface ExpertCardScrollProps {
  experts: ExpertCardProps[];
}

// 디자인 변경되면 적용해주세요
const ExpertCardScroll: React.FC<ExpertCardScrollProps> = ({ experts }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setShowLeftArrow(scrollRef.current.scrollLeft > 0);
      }
    };

    const scrollEl = scrollRef.current;
    scrollEl?.addEventListener('scroll', handleScroll);
    return () => scrollEl?.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollBy = (offset: number) => {
    scrollRef.current?.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <div className="relative flex h-[500px] w-full items-center overflow-hidden">
      {/* 오른쪽 Fade */}
      <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-[80px] bg-gradient-to-l from-white to-transparent" />

      {/* 왼쪽 버튼 */}
      {showLeftArrow && (
        <button
          className="absolute left-3 z-20 m-0 border-none bg-transparent p-0"
          onClick={() => scrollBy(-320)}
        >
          <ArrowRight className="h-[60px] w-[60px] flex-shrink-0 rotate-180" />
        </button>
      )}

      {/* 트레이너 카드 리스트 */}
      <div
        ref={scrollRef}
        className="scrollbar-hide flex h-full w-full gap-[45px] overflow-x-auto scroll-smooth"
      >
        {experts.map((expert, idx) => (
          <div key={idx} className="flex h-full flex-shrink-0 items-center">
            <ExpertProfileCard {...expert} />
          </div>
        ))}
      </div>

      {/* 오른쪽 버튼 */}
      <button
        className="absolute right-3 z-20 m-0 border-none bg-transparent p-0"
        onClick={() => scrollBy(320)}
      >
        <ArrowRight className="h-[60px] w-[60px] flex-shrink-0" />
      </button>
    </div>
  );
};

export default ExpertCardScroll;
