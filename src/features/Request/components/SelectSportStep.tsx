import { useState } from 'react';

import SportsTypeSelector from '@/components/SportsTypeSelector';
import type { SportItem } from '@/constants/sports';

const SelectSportStep = () => {
  const [selected, setSelected] = useState<SportItem | null>(null);

  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-5xl font-extrabold">
        원하는 <span className="text-[var(--color-button)]">운동 종목</span>을 선택해주세요
      </h1>
      <SportsTypeSelector value={selected} onChange={setSelected} />
    </div>
  );
};

export default SelectSportStep;
