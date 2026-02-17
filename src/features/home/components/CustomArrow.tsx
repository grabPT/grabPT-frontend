// SlickArrows.tsx
import { useState } from 'react';

import ArrowRight from '@/features/home/assets/icons/ArrowRight';
import type { Role } from '@/types/Role';

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}
interface NextArrowProps extends ArrowProps {
  isAtEnd?: boolean;
  onEndClick?: () => void;
  role?: Role | null;
}

export const PrevArrow = ({ onClick }: ArrowProps) => (
  <button
    className="absolute top-1/2 left-4 z-20 m-0 flex h-[50px] w-[50px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white p-0 shadow transition-transform duration-200 hover:scale-105 hover:shadow-lg max-xl:h-[40px] max-xl:w-[40px]"
    onClick={onClick}
  >
    <ArrowRight className="aspect-square h-[60px] w-[60px] rotate-180" />
  </button>
);
export const NextArrow = ({ onClick, isAtEnd, onEndClick, role }: NextArrowProps) => {
  const [hovered, setHovered] = useState(false);
  const text = role === 'USER' ? '나의 요청서 페이지로 이동' : '매칭 요청 페이지로 이동';
  return (
    <div
      className="absolute top-1/2 right-4 z-10 -translate-y-1/2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {isAtEnd && hovered && (
        <div className="absolute top-1/2 left-[60px] -translate-y-1/2 rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-semibold whitespace-nowrap text-gray-700 shadow">
          {text}
        </div>
      )}

      <button
        className="flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white p-0 shadow transition-transform duration-200 hover:scale-105 hover:shadow-lg max-xl:h-[40px] max-xl:w-[40px]"
        onClick={isAtEnd ? onEndClick : onClick}
        type="button"
        aria-label={isAtEnd ? '요청서 페이지로 이동' : '다음 슬라이드'}
      >
        <ArrowRight className="aspect-square h-[60px] w-[60px]" />
      </button>
    </div>
  );
};
