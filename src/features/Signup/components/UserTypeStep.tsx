import SignupforTrainer from '@/features/Signup/assets/SignupforTrainer.png';
import SignupforUser from '@/features/Signup/assets/SignupforUser.png';
import SignupBtn from '@/features/Signup/components/SignupBtn';
import type { UserType } from '@/pages/Signup';

interface IUserTypeStep {
  onNext: () => void;
  UserType: UserType | null;
  setUserType: (type: UserType) => void;
}

export const UserTypeStep = ({ onNext, setUserType, UserType }: IUserTypeStep) => {
  return (
    <div className="flex flex-col">
      <div className="mt-32 mb-72 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center text-5xl font-extrabold whitespace-pre">
          <span>어떤 유형의 </span>
          <span className="text-[#003EFB]">사용자</span>
          <span> 인가요?</span>
        </div>
        <div className="mt-8 flex items-center justify-center text-2xl font-semibold text-[#646678]">
          Grab PT를 어떻게 사용할지 선택해 주세요.
        </div>
<div className="mx-auto mt-24 flex w-4xl justify-center gap-20">
  {/* 일반 이용자 카드 */}
  <div
    className={`w-96 rounded-[1.25rem] shadow-2xl transform transition-transform duration-200 hover:scale-105 active:brightness-75 ${
      UserType === 'normal' ? 'brightness-100' : 'brightness-50'
    }`}
    onClick={() => setUserType('normal')}
  >
    <div className="relative overflow-hidden rounded-[1.25rem] cursor-pointer">
      <img
        src={SignupforUser}
        alt="일반 이용자 사진"
        className="z-0 h-auto w-full object-cover"
      />
      <div className="absolute top-6 left-6 z-10 text-center font-semibold text-white">
        PT를 수강하고 싶어요!
      </div>
      <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform text-4xl font-bold whitespace-nowrap text-white">
        일반 이용자 가입
      </div>
    </div>
  </div>

  {/* 전문가 카드 */}
  <div
    className={`w-96 rounded-[1.25rem] shadow-2xl transform transition-transform duration-200 hover:scale-105 active:brightness-75 ${
      UserType === 'expert' ? 'brightness-100' : 'brightness-50'
    }`}
    onClick={() => setUserType('expert')}
  >
    <div className="relative overflow-hidden rounded-[1.25rem] cursor-pointer">
      <img
        src={SignupforTrainer}
        alt="전문가 트레이너 사진"
        className="z-0 h-auto w-full object-cover"
      />
      <div className="absolute top-6 left-6 z-10 font-semibold text-white">
        PT를 수강생을 모집하고 싶어요!
      </div>
      <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform text-center text-4xl font-bold whitespace-nowrap text-white">
        전문가 트레이너 가입
      </div>
    </div>
  </div>
</div>
        <div className="mx-[32rem] mt-24 w-[25.5625rem]">
          <SignupBtn children={'다음'} onClick={onNext} />
        </div>
      </div>
    </div>
  );
};
