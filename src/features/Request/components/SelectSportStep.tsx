import { useState } from 'react';

import SportsTypeSelector from '@/components/SportsTypeSelector';
import type { SportItem } from '@/constants/sports';

const SelectSportStep = () => {
  const [selected, setSelected] = useState<SportItem | null>(null);

  return (
    <div className="mb-12.5 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold">
        원하는 <span className="text-button">운동 종목</span>을 선택해주세요
      </h1>

      <div className="mt-20">
        <SportsTypeSelector value={selected} onChange={setSelected} />
      </div>
    </div>
  );
};

export default SelectSportStep;
