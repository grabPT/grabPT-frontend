// SlickArrows.tsx
import ArrowRight from '@/features/home/assets/icons/ArrowRight';

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const PrevArrow = ({ onClick }: ArrowProps) => (
  <button
    className="absolute top-1/2 left-4 z-20 m-0 flex h-[50px] w-[50px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white p-0 shadow transition-transform duration-200 hover:scale-105 hover:shadow-lg max-xl:h-[40px] max-xl:w-[40px]"
    onClick={onClick}
  >
    <ArrowRight className="aspect-square h-[60px] w-[60px] rotate-180" />
  </button>
);

export const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    className="absolute top-1/2 right-4 z-10 flex h-[50px] w-[50px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white p-0 shadow transition-transform duration-200 hover:scale-105 hover:shadow-lg max-xl:h-[40px] max-xl:w-[40px]"
    onClick={onClick}
  >
    <ArrowRight className="aspect-square h-[60px] w-[60px]" />
  </button>
);
