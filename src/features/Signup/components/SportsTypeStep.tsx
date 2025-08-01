import SportsTypeSelector from '@/components/SportsTypeSelector';
import { SPORTS, type SportItem } from '@/constants/sports';
import SignupBtn from '@/features/Signup/components/SignupBtn';
import { useSignupStore } from '@/store/useSignupStore';

interface SportTypeStepProps {
  onNext: () => void;
}

const SportsTypeStep = ({ onNext }: SportTypeStepProps) => {
  const { sportsTypeInfo, setSportsTypeInfo } = useSignupStore();
  const handleSelect = (sport: SportItem) => {
    setSportsTypeInfo({ categoryId: sport.id });
  };
  const handleNext = () => {
    if (!sportsTypeInfo) {
      alert('운동 종목을 선택해주세요');
      return;
    }
    console.log('sportsTypeInfo', sportsTypeInfo);
    onNext();
  };
  return (
    <div className="flex flex-col">
      <div className="mt-32 mb-72 flex flex-col items-center justify-center">
        <div className="mb-27 flex items-center justify-center text-5xl font-extrabold whitespace-pre">
          <span>원하는 </span>
          <span className="text-[color:var(--color-button)]">운동 종목</span>
          <span>을 선택해주세요</span>
        </div>

        {/* 공용 셀렉터 컴포넌트 */}

        <SportsTypeSelector
          value={SPORTS.find((s) => s.id === sportsTypeInfo.categoryId) ?? null}
          onChange={handleSelect}
        />

        <div className="mx-[32rem] mt-[8.3rem] w-[25.5625rem]">
          {/* 아무 것도 안 골랐을 때는 비활성화 */}
          <SignupBtn disabled={!sportsTypeInfo.categoryId} onClick={handleNext}>
            다음
          </SignupBtn>
        </div>
      </div>
    </div>
  );
};

export default SportsTypeStep;
