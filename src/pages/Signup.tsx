import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import BackBtn from '@/features/Signup/assets/BackBtn.svg';
import { AgreementStep } from '@/features/Signup/components/AgreementStep';
import { ExpertInfoStep } from '@/features/Signup/components/ExpertInfoStep';
import { LocationStep } from '@/features/Signup/components/LocationStep';
import { NickNameStep } from '@/features/Signup/components/NicknameStep';
import { SportsTypeStep } from '@/features/Signup/components/SportsTypeStep';
import { UserInfoStep } from '@/features/Signup/components/UserInfoStep';
import { UserTypeStep } from '@/features/Signup/components/UserTypeStep';

export type UserType = 'normal' | 'expert';
export const Signup = () => {
  const [step, setStep] = useState<number>(0);
  const [userType, setUserType] = useState<UserType | null>(null);
  const nav = useNavigate();
  const handleBackClick = () => {
    if (step <= 0) {
      nav('/'); // step이 0 이하일 때 홈으로 이동
    } else if (userType == 'normal' && step == 4) {
      setStep((prev) => prev - 2);
    } else {
      setStep((prev) => prev - 1); // 그 외에는 한 단계 뒤로
    }
  };
  return (
    <div className="relative h-dvh w-full bg-gradient-to-bl from-[#8CAFFF] to-[#FFFFFF]">
      {/* 뒤로 가기 버튼 */}
      <div className="mx-6">
        <button onClick={handleBackClick}>
          <img src={BackBtn} />
        </button>
      </div>

      {/* 본문 (약관/정보입력/거주지 선택 등) */}
      {step === 0 && <AgreementStep onNext={() => setStep(1)} />}
      {step === 1 && (
        <UserTypeStep onNext={() => setStep(2)} userType={userType} setUserType={setUserType} />
      )}
      {step === 2 && (
        <UserInfoStep
          onNext={() => {
            if (userType === 'expert') {
              setStep(3); // 전문가
            } else {
              setStep(4); //
            }
          }}
        />
      )}

      {step === 3 && <ExpertInfoStep onNext={() => setStep(4)} />}
      {step === 4 && <LocationStep onNext={() => setStep(5)} />}
      {step === 5 && <SportsTypeStep onNext={() => setStep(6)} />}
      {step === 6 && <NickNameStep onNext={() => setStep(7)} />}
    </div>
  );
};
