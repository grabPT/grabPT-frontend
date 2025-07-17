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
    <div className="pw-[132px] relative flex h-[500px] items-center overflow-hidden bg-[linear-gradient(90deg,#F0F2F7_0%,#A0B8FF_108.09%)]">
      {/* 왼쪽 Fade */}
      <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-[80px] bg-gradient-to-r from-[#F0F2F7] to-transparent" />

      {/* 오른쪽 Fade */}
      <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-[80px] bg-gradient-to-l from-[#A0B8FF] to-transparent" />

      {/* 왼쪽 버튼 (조건부 렌더링) */}
      {showLeftArrow && (
        <button
          className="absolute left-3 z-20 m-0 border-none bg-transparent p-0"
          onClick={() => scrollBy(-420)}
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
        className="absolute right-3 z-20 m-0 border-none bg-transparent p-0"
        onClick={() => scrollBy(420)}
      >
        <ArrowRight className="aspect-square h-[60px] w-[60px] flex-shrink-0" />
      </button>
    </div>
  );
};

export default RequestCardScroll;
