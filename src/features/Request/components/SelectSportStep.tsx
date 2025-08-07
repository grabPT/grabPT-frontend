import SportsTypeSelector from '@/components/SportsTypeSelector';
import { SPORTS, type SportItem } from '@/constants/sports';
import { useRequestStore } from '@/store/useRequestStore';

const SelectSportStep = () => {
  //api 연결
  const { sportsTypeInfo, setSportsTypeInfo } = useRequestStore();
  const handleSelect = (sport: SportItem) => {
    setSportsTypeInfo({ categoryId: sport.id });
  };
  return (
    <div className="mb-12.5 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold">
        원하는 <span className="text-button">운동 종목</span>을 선택해주세요
      </h1>

      <div className="mt-20">
        <SportsTypeSelector
          value={SPORTS.find((s) => s.id === sportsTypeInfo.categoryId) ?? null}
          onChange={handleSelect}
        />
      </div>
    </div>
  );
};

export default SelectSportStep;
