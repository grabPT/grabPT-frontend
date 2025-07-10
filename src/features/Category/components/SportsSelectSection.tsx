// src/features/Category/components/SportsSelectSection.tsx
import { SPORTS } from '@/constants/sports';
import { SportsTypeBtn } from '@/features/Signup/components/SportsTypeBtn';
import { SportsType } from '@/features/Signup/types/SportsType';

interface SportsSelectSectionProps {
  selected: SportsType | null;
  onSelect: (type: SportsType) => void;
}

export const SportsSelectSection = ({ selected, onSelect }: SportsSelectSectionProps) => {
  return (
    <section className="w-full px-6 py-20">
      <div className="mx-auto" style={{ width: 'calc(120px * 5 + 27px * 4)' }}>
        <h2 className="font-pretendard mb-[15px] text-left text-[40px] leading-[100%] font-extrabold text-black">
          운동
        </h2>
        <p className="font-pretendard mb-12 text-left text-[16px] leading-none font-semibold text-[#646678]">
          원하는 운동을 선택해 보세요. 트레이너를 추천해 드립니다.
        </p>

        <div
          className="grid"
          style={{
            gridTemplateColumns: 'repeat(5, 120px)',
            columnGap: '27px',
            rowGap: '19px',
          }}
        >
          {SPORTS.map(({ slug, type, img }) => (
            <div key={slug}>
              <SportsTypeBtn
                type={type}
                img={img}
                isSelected={selected}
                onClick={() => onSelect(type)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
