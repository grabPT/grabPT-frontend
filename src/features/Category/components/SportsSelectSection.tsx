import Banner from '@/components/Banner';
import SportsTypeSelector from '@/components/SportsTypeSelector';
import type { SportItem } from '@/constants/sports';

interface SportsSelectSectionProps {
  selected: SportItem | null;
  onSelect: (item: SportItem) => void;
}

const SportsSelectSection = ({ selected, onSelect }: SportsSelectSectionProps) => {
  return (
    <section className="w-full px-6 py-20">
      <div className="mx-auto w-[calc(120px*5+27px*4)]">
        <h2 className="font-pretendard mb-[15px] text-left text-[40px] leading-[100%] font-extrabold">
          운동
        </h2>
        <p className="font-pretendard mb-12 text-left text-[16px] leading-none font-semibold text-[#646678]">
          원하는 운동을 선택해 보세요. 트레이너를 추천해 드립니다.
        </p>

        <SportsTypeSelector value={selected} onChange={onSelect} />
      </div>

      {/* 배너 */}
      <div className="mx-auto mt-[200px] max-w-[1480px] sm:w-[720px] lg:w-[720px]">
        <Banner />
      </div>
    </section>
  );
};

export default SportsSelectSection;
