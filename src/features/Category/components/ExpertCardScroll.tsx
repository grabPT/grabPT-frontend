import { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { urlFor } from '@/constants/routes';
import ExpertProfileCard from '@/features/Category/components/ExpertProfileCard';
import ArrowRight from '@/features/home/assets/icons/ArrowRight';
import type { ExpertCardItem } from '@/types/ExpertCardItemType';

interface ExpertCardScrollProps {
  experts: ExpertCardItem[];
}

const ExpertCardScroll = ({ experts }: ExpertCardScrollProps) => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const navigateToExpertDetail = (id: number) => {
    navigate(urlFor.expertDetail(id));
  };

  const updateArrowVisibility = () => {
    const el = scrollRef.current;
    if (!el) return;
    const atLeft = el.scrollLeft <= 0;
    const atRight = Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth; // 반올림으로 오차 보정
    setShowLeftArrow(!atLeft);
    setShowRightArrow(!atRight);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => updateArrowVisibility();
    el.addEventListener('scroll', onScroll, { passive: true });

    updateArrowVisibility();

    const onResize = () => updateArrowVisibility();
    window.addEventListener('resize', onResize);

    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const scrollBy = (offset: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: offset, behavior: 'smooth' });

    requestAnimationFrame(updateArrowVisibility);
    setTimeout(updateArrowVisibility, 350);
  };

  if (!experts?.length) {
    return (
      <div className="flex h-[200px] w-full items-center justify-center text-gray-500">
        주변 전문가를 찾지 못했어요.
      </div>
    );
  }

  return (
    <div className="relative flex h-[400px] w-full items-center overflow-hidden">
      {/* 오른쪽 Fade */}
      <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-[80px]" />

      {/* 왼쪽 버튼 */}
      {showLeftArrow && (
        <button
          className="absolute left-3 z-20 m-0 flex h-[60px] w-[60px] items-center justify-center rounded-full border border-gray-300 bg-white p-0 shadow transition-transform duration-200 hover:scale-105 hover:shadow-lg"
          onClick={() => scrollBy(-320)}
          aria-label="이전"
        >
          <ArrowRight className="aspect-square h-[60px] w-[60px] flex-shrink-0 rotate-180" />
        </button>
      )}

      {/* 트레이너 카드 리스트 */}
      <div
        ref={scrollRef}
        className="scrollbar-hide flex h-full w-full gap-[45px] overflow-x-auto scroll-smooth"
      >
        {experts.map(({ id, ...cardProps }) => (
          <div
            key={id}
            className="flex h-full flex-shrink-0 cursor-pointer items-center"
            onClick={() => navigateToExpertDetail(id)}
          >
            <ExpertProfileCard {...cardProps} />
          </div>
        ))}
      </div>

      {/* 오른쪽 버튼 */}
      {showRightArrow && (
        <button
          className="absolute right-3 z-20 m-0 flex h-[60px] w-[60px] items-center justify-center rounded-full border border-gray-300 bg-white p-0 shadow transition-transform duration-200 hover:scale-105 hover:shadow-lg"
          onClick={() => scrollBy(320)}
          aria-label="다음"
        >
          <ArrowRight className="aspect-square h-[60px] w-[60px] flex-shrink-0" />
        </button>
      )}
    </div>
  );
};

export default ExpertCardScroll;
