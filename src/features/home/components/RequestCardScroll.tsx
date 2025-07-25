import React, { useEffect, useRef, useState } from 'react';

import ArrowRight from '@/features/home/assets/icons/ArrowRight';
import RequestCard from '@/features/home/components/RequestCard';
import type { RequestCardProps } from '@/features/home/types/request';

interface RequestCardScrollProps {
  requests: RequestCardProps[];
}

const RequestCardScroll: React.FC<RequestCardScrollProps> = ({ requests }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setShowLeftArrow(scrollRef.current.scrollLeft > 0);
      }
    };

    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener('scroll', handleScroll);
    }

    // cleanup
    return () => {
      if (scrollEl) {
        scrollEl.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollBy = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="pw-[132px] relative mx-auto flex h-[500px] w-[1477px] items-center overflow-hidden">
      {/* 왼쪽 Fade */}
      <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-[80px]" />

      {/* 오른쪽 Fade */}
      <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-[80px]" />

      {/* 왼쪽 버튼 (조건부 렌더링) */}
      {showLeftArrow && (
        <button
          className="absolute left-3 z-20 m-0 flex h-[60px] w-[60px] items-center justify-center rounded-full border border-gray-300 bg-white p-0 shadow hover:shadow-lg transition-transform duration-200 hover:scale-105"
          onClick={() => scrollBy(-800)}
        >
          <ArrowRight className="aspect-square h-[60px] w-[60px] flex-shrink-0 rotate-180" />
        </button>
      )}

      {/* 카드 리스트 */}
      <div
        ref={scrollRef}
        className="scrollbar-hide flex w-full gap-4 overflow-x-auto scroll-smooth px-10"
      >
        {requests.map((request, idx) => (
          <RequestCard key={idx} {...request} />
        ))}
      </div>

      {/* 오른쪽 버튼 */}
      <button
        className="absolute right-3 z-20 m-0 flex h-[60px] w-[60px] items-center justify-center rounded-full border border-gray-300 bg-white p-0 shadow hover:shadow-lg transition-transform duration-200 hover:scale-105"
        onClick={() => scrollBy(800)}
      >
        <ArrowRight className="aspect-square h-[60px] w-[60px] flex-shrink-0" />
      </button>
    </div>
  );
};

export default RequestCardScroll;
