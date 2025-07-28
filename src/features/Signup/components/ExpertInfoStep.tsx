import SignupLogo from '@/features/Signup/assets/SignupLogo.png';
import SignupBtn from '@/features/Signup/components/SignupBtn';
import { useSignupStore } from '@/store/useSignupStore';

interface ExpertInfoStepProps {
  onNext: () => void;
}

const ExpertInfoStep = ({ onNext }: ExpertInfoStepProps) => {
  const { proInfo, setProInfo } = useSignupStore();
  const handleNext = () => {
    if (!proInfo) {
      alert('사용자 정보를 올바르게 입력해주세요');
      return;
    }
    console.log('proInfo', proInfo);
    onNext();
  };
  return (
    <div className="flex flex-col items-center justify-center">
      {/* 로고 */}
      <div className="mt-6 flex justify-center">
        <img src={SignupLogo} alt="로고" className="h-[2.3125rem] w-[6.25rem]" />
      </div>
      <div className="mt-14 flex h-[42.25rem] w-[34.375rem] flex-col items-center rounded-[1.25rem] border border-white bg-white shadow-2xl">
        <div className="relative flex h-full w-full flex-col">
          <div className="mx-[4.375rem] mt-16 flex flex-col gap-2">
            <div className="flex flex-col">
              <span className="font-semibold">활동센터</span>
              <input
                placeholder="센터 이름을 입력해주세요"
                onChange={(e) => setProInfo({ ...proInfo, center: e.target.value })}
                className="h-fit w-full rounded-[0.625rem] border border-[#BDBDBD] py-[0.88rem] pl-4"
              />
            </div>
            <div className="flex items-center gap-4">
              {/* 나이 */}
              <div className="flex w-1/2 flex-col gap-1">
                <span className="mb-1 font-semibold">나이</span>
                <input
                  placeholder="나이"
                  className="w-full rounded-[0.625rem] border border-[#BDBDBD] py-[0.88rem] pl-4"
                  //나중에 문자는 제한하는 로직 추가할 것
                  onChange={(e) => setProInfo({ ...proInfo, age: Number(e.target.value) })}
                />
              </div>

              {/* 성별 */}
              <div className="flex w-1/2 flex-col gap-1">
                <span className="mb-1 font-semibold">성별</span>
                <div className="w-full rounded-[0.625rem] border border-[#BDBDBD] px-2 py-[0.88rem]">
                  <select
                    id="sex"
                    name="sex"
                    className="w-full text-[#707070] outline-none"
                    onChange={(e) => setProInfo({ ...proInfo, gender: Number(e.target.value) })}
                  >
                    <option value="1">남</option>
                    <option value="2">여</option>
                  </select>
                </div>
              </div>
            </div>
            {/* 경력-화살표가 좀 조잡함 */}
            <div className="flex flex-col gap-1">
              <span className="font-semibold">경력</span>
              <div className="flex items-center justify-between rounded-[0.625rem] border border-[#BDBDBD] px-4 py-[0.88rem]">
                <input
                  type="number"
                  min={0}
                  step={1}
                  placeholder="경력을 입력해주세요"
                  className="w-full outline-none"
                  onChange={(e) => setProInfo({ ...proInfo, career: Number(e.target.value) })}
                />
                <span className="ml-2 text-[#707070]">년</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-12 left-1/2 w-[25.5625rem] -translate-x-1/2 transform">
            <SignupBtn onClick={handleNext}>다음</SignupBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertInfoStep;
