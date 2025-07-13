import { useState } from 'react';

import Badminton from '@/features/Signup/assets/Badminton.png';
import Boxing from '@/features/Signup/assets/Boxing.png';
import Cycle from '@/features/Signup/assets/Cycle.png';
import Golf from '@/features/Signup/assets/Golf.png';
import Pilates from '@/features/Signup/assets/Pliates.png';
import Running from '@/features/Signup/assets/Running.png';
import Swimming from '@/features/Signup/assets/Swimming.png';
import Tabletennis from '@/features/Signup/assets/Tabletennis.png';
import Tennis from '@/features/Signup/assets/Tennis.png';
import Weight from '@/features/Signup/assets/Weight.png';
import SignupBtn from '@/features/Signup/components/SignupBtn';
import { SportsTypeBtn } from '@/features/Signup/components/SportsTypeBtn';
import { SportsType } from '@/features/Signup/types/SportsType';

interface ISportTypeStep {
  onNext: () => void;
}

export const SportsTypeStep = ({ onNext }: ISportTypeStep) => {
  //운동종목 배열
  const sportsOptions = [
  { type: SportsType.WEIGHT, img: Weight },
  { type: SportsType.PILATES, img: Pilates },
  { type: SportsType.GOLF, img: Golf },
  { type: SportsType.TENNIS, img: Tennis },
  { type: SportsType.SWIMMING, img: Swimming },
  { type: SportsType.BOXING, img: Boxing },
  { type: SportsType.BADMINTON, img: Badminton },
  { type: SportsType.RUNNING, img: Running },
  { type: SportsType.CYCLE, img: Cycle },
  { type: SportsType.TABLETENNIS, img: Tabletennis },
];
  const [selectedSportsType, setSelectedSportsType] = useState<SportsType | null>(null);
  return (
    <div className="flex flex-col">
      <div className="mt-32 mb-72 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center text-5xl font-extrabold whitespace-pre">
          <span>원하는 </span>
          <span className="text-[#003EFB]">운동 종목</span>
          <span>을 선택해주세요</span>
        </div>

        {/* 운동 종목 나열 */}
       <div className="mx-auto mt-24 grid h-72 w-3xl grid-cols-5 place-items-center">
  {sportsOptions.map(({ type, img }) => (
    <SportsTypeBtn
      key={type}
      type={type}
      img={img}
      isSelected={selectedSportsType}
      onClick={() => setSelectedSportsType(type)}
    />
  ))}
</div>
        {/* 다음 버튼 */}
        <div className="mx-[32rem] mt-[8.3rem] w-[25.5625rem]">
          <SignupBtn onClick={onNext}>다음</SignupBtn>
        </div>
      </div>
    </div>
  );
};
