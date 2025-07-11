import SportsTypeBtn from '@/components/SportsTypeBtn';
import type { SportsType } from '@/types/SportsType';

type Option = {
  type: SportsType;
  img: string;
};

interface SportsTypeSelectorProps {
  options: ReadonlyArray<Option>;
  value: SportsType | null;
  onChange: (type: SportsType) => void;
  onSelectEnd?: (type: SportsType) => void;
}

const SportsTypeSelector = ({ options, value, onChange, onSelectEnd }: SportsTypeSelectorProps) => {
  const handleClick = (t: SportsType) => {
    onChange(t);
    onSelectEnd?.(t);
  };

  return (
    <div className="grid grid-cols-5 gap-x-[27px] gap-y-[19px]">
      {options.map(({ type, img }) => (
        <SportsTypeBtn
          key={type}
          type={type}
          img={img}
          isSelected={value}
          onClick={() => handleClick(type)}
        />
      ))}
    </div>
  );
};

export default SportsTypeSelector;
