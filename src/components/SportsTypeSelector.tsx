import SportsTypeBtn from '@/components/SportsTypeBtn';
import { SPORTS } from '@/constants/sports';
import type { SportItem } from '@/constants/sports';

interface SportsTypeSelectorProps {
  value: SportItem | null;
  onChange: (sport: SportItem) => void;
  onSelectEnd?: (sport: SportItem) => void;
}

const SportsTypeSelector = ({ value, onChange, onSelectEnd }: SportsTypeSelectorProps) => {
  const handleClick = (sport: SportItem) => {
    onChange(sport);
    onSelectEnd?.(sport);
  };
  return (
    <div className="grid grid-cols-5 gap-x-[27px] gap-y-[19px]">
      {SPORTS.map((sport: SportItem) => (
        <SportsTypeBtn
          key={sport.id}
          label={sport.label}
          img={sport.img}
          isSelected={value?.id === sport.id}
          onClick={() => handleClick(sport)}
        />
      ))}
    </div>
  );
};

export default SportsTypeSelector;
