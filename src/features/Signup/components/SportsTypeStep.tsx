import { useState } from 'react';

import SportsTypeSelector from '@/components/SportsTypeSelector';
// ← 변경
// import Badminton from '@/features/Signup/assets/Badminton.png';
// import Boxing from '@/features/Signup/assets/Boxing.png';
// import Cycle from '@/features/Signup/assets/Cycle.png';
// import Golf from '@/features/Signup/assets/Golf.png';
// import Pilates from '@/features/Signup/assets/Pliates.png';
// import Running from '@/features/Signup/assets/Running.png';
// import Swimming from '@/features/Signup/assets/Swimming.png';
// import Tabletennis from '@/features/Signup/assets/Tabletennis.png';
// import Tennis from '@/features/Signup/assets/Tennis.png';
// import Weight from '@/features/Signup/assets/Weight.png';
import SignupBtn from '@/features/Signup/components/SignupBtn';
import { SportsType } from '@/types/SportsType';

interface SportTypeStepProps {
  onNext: () => void;
}

// const options: ReadonlyArray<{ type: SportsType; img: string }> = [
//   { type: SportsType.WEIGHT, img: Weight },
//   { type: SportsType.PILATES, img: Pilates },
//   { type: SportsType.GOLF, img: Golf },
//   { type: SportsType.TENNIS, img: Tennis },
//   { type: SportsType.SWIMMING, img: Swimming },
//   { type: SportsType.BOXING, img: Boxing },
//   { type: SportsType.BADMINTON, img: Badminton },
//   { type: SportsType.RUNNING, img: Running },
//   { type: SportsType.CYCLE, img: Cycle },
//   { type: SportsType.TABLETENNIS, img: Tabletennis },
// ];

const SportsTypeStep = ({ onNext }: SportTypeStepProps) => {
  const [selected, setSelected] = useState<SportsType | null>(null);

  return (
    <div className="flex flex-col">
      <div className="mt-32 mb-72 flex flex-col items-center justify-center">
        <div className="mb-27 flex items-center justify-center text-5xl font-extrabold whitespace-pre">
          <span>원하는 </span>
          <span className="text-[color:var(--color-button)]">운동 종목</span>
          <span>을 선택해주세요</span>
        </div>

        {/* 공용 셀렉터 컴포넌트 */}

        <SportsTypeSelector value={selected} onChange={setSelected} />

        <div className="mx-[32rem] mt-[8.3rem] w-[25.5625rem]">
          {/* 아무 것도 안 골랐을 때는 비활성화 */}
          <SignupBtn disabled={!selected} onClick={onNext}>
            다음
          </SignupBtn>
        </div>
      </div>
    </div>
  );
};

export default SportsTypeStep;
