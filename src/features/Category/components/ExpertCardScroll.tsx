import { useEffect, useLayoutEffect, useRef, useState } from 'react';

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

  // ✅ 초기엔 오른쪽만 보이게
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // 스크롤 step(카드+간격). 첫 렌더 이후 측정
  const stepRef = useRef<number>(320);

  const navigateToExpertDetail = (id: number) => {
    navigate(urlFor.expertDetail(id));
  };

  const updateArrowVisibility = () => {
    const el = scrollRef.current;
    if (!el) return;
    const EPS = 2; // 서브픽셀/반올림 오차 보정
    const atLeft = el.scrollLeft <= EPS;
    const atRight = el.scrollLeft + el.clientWidth >= el.scrollWidth - EPS;
    setShowLeftArrow(!atLeft);
    setShowRightArrow(!atRight);
  };

  // 카드 실제 너비 측정해서 step 계산 (처음 한 번 + experts 변동 시)
  const measureStep = () => {
    const wrap = scrollRef.current;
    if (!wrap) return;

    const first = wrap.querySelector<HTMLElement>(':scope > *');
    if (!first) return;

    // 카드 너비 + gap 추정
    const cardWidth = first.getBoundingClientRect().width;
    // Tailwind gap-[45px] — 실제 gap 값을 읽기
    const style = window.getComputedStyle(wrap);
    const gap = parseFloat(style.columnGap || style.gap || '0') || 0;

    const step = Math.max(160, Math.round(cardWidth + gap)); // 최소 보정
    stepRef.current = step;
  };

  // ✅ 첫 레이아웃 직후 한 번 계산 (깜빡임 최소화)
  useLayoutEffect(() => {
    measureStep();
    updateArrowVisibility();
  }, [experts]);

  // ✅ 스크롤/리사이즈/컨텐츠 크기변화(이미지 로드 등) 모두 추적
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => updateArrowVisibility();
    el.addEventListener('scroll', onScroll, { passive: true });

    const onWinResize = () => {
      measureStep();
      updateArrowVisibility();
    };
    window.addEventListener('resize', onWinResize);

    // 래퍼 크기 변할 때도 반응
    const ro = new ResizeObserver(() => {
      measureStep();
      updateArrowVisibility();
    });
    ro.observe(el);

    // 이미지 지연 로드 대비
    const raf = requestAnimationFrame(() => {
      measureStep();
      updateArrowVisibility();
    });
    const t = setTimeout(() => {
      measureStep();
      updateArrowVisibility();
    }, 300);

    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onWinResize);
      ro.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, []);

  const scrollBy = (offset: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: offset, behavior: 'smooth' });

    // 스무스 스크롤 중에도 상태 갱신
    requestAnimationFrame(updateArrowVisibility);
    setTimeout(updateArrowVisibility, 350);
  };

  const scrollNext = () => scrollBy(stepRef.current);
  const scrollPrev = () => scrollBy(-stepRef.current);

  if (!experts?.length) {
    return (
      <div className="flex h-[200px] w-full items-center justify-center text-gray-500">
        주변 전문가를 찾지 못했어요.
      </div>
    );
  }

  return (
    <div className="relative flex h-[400px] w-full items-center overflow-hidden">
      {/* 오른쪽 Fade (필요 시 그라데이션 배경 추가) */}
      <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-[80px]" />

      {/* 왼쪽 버튼 — 스크롤 시작 후 등장 */}
      {showLeftArrow && (
        <button
          type="button"
          className="absolute left-3 z-20 m-0 flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white p-0 shadow transition-transform duration-200 hover:scale-105 hover:shadow-lg"
          onClick={scrollPrev}
          aria-label="이전"
        >
          <ArrowRight className="aspect-square h-[60px] w-[60px] flex-shrink-0 rotate-180" />
        </button>
      )}

      {/* 카드 리스트 */}
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

      {/* 오른쪽 버튼 — 초기에는 true, 끝까지 가면 숨김 */}
      {showRightArrow && (
        <button
          type="button"
          className="absolute right-3 z-20 m-0 flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white p-0 shadow transition-transform duration-200 hover:scale-105 hover:shadow-lg"
          onClick={scrollNext}
          aria-label="다음"
        >
          <ArrowRight className="aspect-square h-[60px] w-[60px] flex-shrink-0" />
        </button>
      )}
    </div>
  );
};

export default ExpertCardScroll;
