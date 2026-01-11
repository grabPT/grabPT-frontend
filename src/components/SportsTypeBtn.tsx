import type { SportsLabelType } from '@/types/SportsType';

interface SportsTypeBtnProps {
  label: SportsLabelType;
  img: string;
  onClick: () => void;
  isSelected: boolean;
}

/**
 * 스포츠 선택 시 버튼 컴포넌트
 */
const SportsTypeBtn = ({ label, img, isSelected, onClick }: SportsTypeBtnProps) => {
  // 선택된 운동 종목과 현재 버튼의 종목이 일치하는지 확인
  return (
    <div
      className={`relative h-32 w-32 transform cursor-pointer overflow-hidden rounded-[0.625rem] transition duration-200 ease-in-out ${isSelected ? 'scale-105' : 'hover:scale-105'} `}
      onClick={onClick}
    >
      <div className={`absolute inset-0 z-0 h-full w-full`}>
        <img src={img} alt="운동 종목 사진" className="h-full w-full object-cover" />
        <div
          className={`absolute inset-0 transition-colors duration-200 ease-in-out ${isSelected ? 'bg-[#003EFBB2]' : 'bg-black/58'}`}
        />
      </div>

      <div className="absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold whitespace-nowrap text-white drop-shadow-md">
        {label}
      </div>
    </div>
  );
};

export default SportsTypeBtn;
