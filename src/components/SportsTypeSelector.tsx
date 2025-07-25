import SportsTypeBtn from '@/components/SportsTypeBtn';
import { SPORTS } from '@/constants/sports';
import type { SportsType } from '@/types/SportsType';

interface SportsTypeSelectorProps {
  value: SportsType | null;
  onChange: (type: SportsType) => void;
  onSelectEnd?: (type: SportsType) => void;
}

const SportsTypeSelector = ({ value, onChange, onSelectEnd }: SportsTypeSelectorProps) => {
  const handleClick = (t: SportsType) => {
    onChange(t);
    onSelectEnd?.(t);
  };

  return (
    <div className="grid grid-cols-5 gap-x-[27px] gap-y-[19px]">
      {SPORTS.map(({ type, img }) => (
        <SportsTypeBtn
          key={type}
          type={type}
          img={img}
          isSelected={value === type}
          onClick={() => handleClick(type)}
        />
      ))}
    </div>
  );
};

export default SportsTypeSelector;
