import RightArrow from '@/assets/images/RightArrow.svg';

interface FractionPaginationProps {
  currentPage: number;
  totalPage: number;
  onNext?: () => void;
}

const FractionPagination = ({ currentPage, totalPage, onNext }: FractionPaginationProps) => {
  return (
    <nav
      aria-label="배너"
      className="relative inline-flex h-[26px] w-[58px] items-center rounded-full bg-[#3A3A3A]/60 pl-[10px] text-[14px] text-white tabular-nums"
    >
      {/* 중앙 페이지 분수 */}
      <span className="flex cursor-default gap-[2px]">
        <span className="font-semibold">{currentPage}</span>
        <span className="font-medium text-[#B8B8B8]">/</span>
        <span className="font-medium text-[#B8B8B8]">{totalPage}</span>
      </span>

      {/* 오른쪽 화살표 */}
      <button
        type="button"
        onClick={onNext}
        aria-label="다음 배너"
        className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
      >
        <img src={RightArrow} alt="" className="h-[11px] w-[6px]" />
      </button>
    </nav>
  );
};

export default FractionPagination;
