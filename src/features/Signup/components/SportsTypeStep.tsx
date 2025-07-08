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
          <SportsTypeBtn
            type={SportsType.WEIGHT}
            img={Weight}
            isSelected={selectedSportsType}
            onClick={() => setSelectedSportsType(SportsType.WEIGHT)}
          />
          <SportsTypeBtn
            type={SportsType.PILATES}
            img={Pilates}
            isSelected={selectedSportsType}
            onClick={() => setSelectedSportsType(SportsType.PILATES)}
          />
          <SportsTypeBtn
            type={SportsType.GOLF}
            img={Golf}
            isSelected={selectedSportsType}
            onClick={() => setSelectedSportsType(SportsType.GOLF)}
          />
          <SportsTypeBtn
            type={SportsType.TENNIS}
            img={Tennis}
            isSelected={selectedSportsType}
            onClick={() => setSelectedSportsType(SportsType.TENNIS)}
          />
          <SportsTypeBtn
            type={SportsType.SWIMMING}
            img={Swimming}
            isSelected={selectedSportsType}
            onClick={() => setSelectedSportsType(SportsType.SWIMMING)}
          />
          <SportsTypeBtn
            type={SportsType.BOXING}
            img={Boxing}
            isSelected={selectedSportsType}
            onClick={() => setSelectedSportsType(SportsType.BOXING)}
          />
          <SportsTypeBtn
            type={SportsType.BADMINTON}
            img={Badminton}
            isSelected={selectedSportsType}
            onClick={() => setSelectedSportsType(SportsType.BADMINTON)}
          />
          <SportsTypeBtn
            type={SportsType.RUNNING}
            img={Running}
            isSelected={selectedSportsType}
            onClick={() => setSelectedSportsType(SportsType.RUNNING)}
          />
          <SportsTypeBtn
            type={SportsType.CYCLE}
            img={Cycle}
            isSelected={selectedSportsType}
            onClick={() => setSelectedSportsType(SportsType.CYCLE)}
          />
          <SportsTypeBtn
            type={SportsType.TABLETENNIS}
            img={Tabletennis}
            isSelected={selectedSportsType}
            onClick={() => setSelectedSportsType(SportsType.TABLETENNIS)}
          />
        </div>
        {/* 다음 버튼 */}
        <div className="mx-[32rem] mt-[8.3rem] w-[25.5625rem]">
          <SignupBtn children={'다음'} onClick={onNext} />
        </div>
      </div>
    </div>
  );
};
