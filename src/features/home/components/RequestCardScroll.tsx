import React, { useRef, useState, useEffect } from 'react';
import RequestCard from './RequestCard';
import type { RequestCardProps } from '@/features/home/types/request';
import ArrowRight from '@/features/home/assets/icons/ArrowRight';


interface Props {
  requests: RequestCardProps[];
}

const RequestCardScroll: React.FC<Props> = ({ requests }) => {
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
    <div className="mt-6 mb-100 relative pw-[132px] h-[500px] bg-[linear-gradient(90deg,#F0F2F7_0%,#A0B8FF_108.09%)] flex items-center overflow-hidden">
      {/* 왼쪽 Fade */}
      <div className="absolute left-0 top-0 h-full w-[80px] bg-gradient-to-r from-[#F0F2F7] to-transparent z-10 pointer-events-none" />

      {/* 오른쪽 Fade */}
      <div className="absolute right-0 top-0 h-full w-[80px] bg-gradient-to-l from-[#A0B8FF] to-transparent z-10 pointer-events-none" />

      {/* 왼쪽 버튼 (조건부 렌더링) */}
      {showLeftArrow && (
        <button
          className="absolute left-3 z-20 bg-transparent p-0 m-0 border-none"
          onClick={() => scrollBy(-420)}
        >
          <ArrowRight className="w-[60px] h-[60px] rotate-180 flex-shrink-0 aspect-square" />
        </button>
      )}

      {/* 카드 리스트 */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth w-full px-10"
      >
        {requests.map((request, idx) => (
          <RequestCard key={idx} {...request} />
        ))}
      </div>

      {/* 오른쪽 버튼 */}
      <button
        className="absolute right-3 z-20 bg-transparent p-0 m-0 border-none"
        onClick={() => scrollBy(420)}
      >
        <ArrowRight className="w-[60px] h-[60px] flex-shrink-0 aspect-square" />
      </button>
    </div>
  );
};

export default RequestCardScroll;
