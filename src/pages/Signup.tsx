import { useState } from 'react';

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
  return (
    <div className="relative h-dvh w-full bg-gradient-to-bl from-[#8CAFFF] to-[#FFFFFF]">
      {/* 본문 (약관/정보입력/거주지 선택 등) */}
      {step === 0 && <AgreementStep onNext={() => setStep(1)} onPrev={() => setStep(0)} />}
      {step === 1 && (<UserTypeStep onNext={() => setStep(2)} onPrev={() => setStep(0)} UserType={userType} setUserType={setUserType}/>)}
      {step === 2 && (<UserInfoStep
          onNext={() => {
            if (userType === 'expert') {
              setStep(3); // 전문가
            } else {
              setStep(4); // 
            }
          }}
          onPrev={() => setStep(1)}
        />
      )}

      {step === 3 && <ExpertInfoStep onNext={() => setStep(4)} onPrev={() => setStep(2)} />}
      {step === 4 && <LocationStep onNext={() => setStep(5)} onPrev={() => setStep(2)} />}
      {step === 5 && <SportsTypeStep onNext={() => setStep(6)} onPrev={() => setStep(4)} />}
      {step === 6 && <NickNameStep onNext={() => setStep(7)} onPrev={() => setStep(5)} />}

      {/* 로그인 ui에서만 활용 나중에 지우기 */}
      {/* <div className="text- mt-[6.69rem] ml-[2.37rem] font-normal">
        <span>최초 로그인 시 이용약관과 </span>
        <span className="text-[#93A2EB]">개인정보 취급방침</span>,<br />
        <span className="text-[#93A2EB]">위치기반서비스 이용약관</span>
        <span>에 동의하는 것으로 간주합니다.</span>
      </div> */}
    </div>
  );
};
