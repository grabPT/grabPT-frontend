import SignupLogo from '@/features/Signup/assets/SignupLogo.png';
import VerifyCheck from '@/features/Signup/assets/VerifyCheck.png';
import SignupBtn from '@/features/Signup/components/SignupBtn';

interface IUserInfoStep {
  onNext: () => void;
}

export const UserInfoStep = ({ onNext }: IUserInfoStep) => {
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
              <span className="font-semibold">이름</span>
              <input
                placeholder="이름"
                className="rounded-[0.625rem] border border-[#BDBDBD] py-[0.88rem] pl-4"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">이메일</span>
              <input
                placeholder="이메일"
                className="rounded-[0.625rem] border border-[#BDBDBD] py-[0.88rem] pl-4"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex gap-12 font-semibold">
                <span>국가</span>
                <span>전화번호</span>
              </div>
              <div className="relative flex items-center rounded-[0.625rem] border border-[#BDBDBD]">
                <div className="inline-flex border-r border-[#BDBDBD] px-3 py-[0.88rem]">
                  <label htmlFor="country-code"></label>
                  <select id="country-code" name="countryCode" className="text-[#707070]">
                    <option value="+82">+82</option>
                    <option value="+1">+1</option>
                    <option value="+81">+81</option>
                    <option value="+86">+86</option>
                  </select>
                </div>
                <input
                  placeholder="3334586492"
                  // onSubmit={}
                  className="ml-[1.25rem]"
                />
                <button className='active:bg-[color:var(--color-button-pressed)]" absolute top-1/2 right-4 flex h-7 w-[4.375rem] -translate-y-1/2 items-center justify-center rounded-[3.125rem] bg-[color:var(--color-button)] text-[0.625rem] font-semibold text-white hover:bg-[color:var(--color-button-hover)]'>
                  인증요청
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">인증번호</span>
              <div className="flex items-center justify-between rounded-[0.625rem] border border-[#BDBDBD]">
                <input placeholder="XXXXXX" className="py-[0.88rem] pl-4"></input>
                <img src={VerifyCheck} alt="인증 완료 버튼" className="mr-4 h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-12 left-1/2 w-[25.5625rem] -translate-x-1/2 transform">
            <SignupBtn children={'인증하기'} onClick={onNext} />
          </div>
        </div>
      </div>
    </div>
  );
};
