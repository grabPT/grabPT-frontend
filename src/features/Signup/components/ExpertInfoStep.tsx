import BackBtn from '@/features/Signup/assets/BackBtn.png';
import Signup_LogoIcon from '@/features/Signup/assets/Signup_LogoIcon.png';
import SignupBtn from '@/features/Signup/components/SignupBtn';

interface IExpertInfoStep {
  onNext: () => void;
  onPrev: () => void;
}

export const ExpertInfoStep = ({ onNext, onPrev }: IExpertInfoStep) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* 로고 */}
      <div className="mt-[6.5rem] flex justify-center">
        <img src={Signup_LogoIcon} alt="로고" className="h-[2.3125rem] w-[6.25rem]" />
      </div>
      <div className="mt-[2.06rem] flex h-[42.25rem] w-[34.375rem] flex-col items-center rounded-[1.25rem] border border-white bg-white shadow-lg">
        <div className="relative flex h-full w-full flex-col">
          <div className="mt-[2.56rem] ml-[1.87rem] flex gap-4">
            <button>
              <img src={BackBtn} alt="뒤로가기" onClick={onPrev} />
            </button>
          </div>
          <div className="mx-[6.5rem] mt-[2.06rem] flex flex-col gap-2">
            <div className="flex flex-col">
              <span className="font-semibold">활동센터</span>
              <input
                placeholder="센터 이름을 입력해주세요"
                className="h-fit w-full rounded-[0.625rem] border border-[#BDBDBD] py-[0.88rem] pl-4"
              />
            </div>
            <div className="flex items-center gap-4">
              {/* 나이 */}
              <div className="flex w-1/2 flex-col">
                <span className="mb-1 font-semibold">나이</span>
                <input
                  placeholder="나이"
                  className="w-full rounded-[0.625rem] border border-[#BDBDBD] py-[0.88rem] pl-4"
                />
              </div>

              {/* 성별 */}
              <div className="flex w-1/2 flex-col">
                <span className="mb-1 font-semibold">성별</span>
                <div className="w-full rounded-[0.625rem] border border-[#BDBDBD] px-2 py-[0.88rem]">
                  <select id="sex" name="sex" className="w-full text-[#707070] outline-none">
                    <option value="남">남</option>
                    <option value="여">여</option>
                  </select>
                </div>
              </div>
            </div>
           <div className="flex flex-col">
              <span className="font-semibold">경력</span>
              <div className="flex items-center justify-between rounded-[0.625rem] border border-[#BDBDBD]">
                <input placeholder="경력을 입력해주세요" className="py-[0.88rem] pl-4"></input>
              </div>
            </div>
          </div>
          <div className="absolute bottom-12 left-1/2 w-96 -translate-x-1/2 transform">
            <SignupBtn children={'인증하기'} onClick={onNext} />
          </div>
        </div>
      </div>
    </div>
  );
};
