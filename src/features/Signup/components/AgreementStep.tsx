import { useState } from 'react';
import FrontBtn from '@/features/Signup/assets/FrontBtn.png';
import SignupLogo from '@/features/Signup/assets/SignupLogo.png';
import SignupBtn from '@/features/Signup/components/SignupBtn';

interface IAgreementStep {
  onNext: () => void;
}

export const AgreementStep = ({ onNext }: IAgreementStep) => {
  const [checkedList, setCheckedList] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const toggleCheckbox = (index: number) => {
    const newList = [...checkedList];
    newList[index] = !newList[index];
    setCheckedList(newList);
  };
  const toggleAllCheckbox = () => {
    const allTrueList = [true, true, true, true, true, true];
    const allFalseList = [false, false, false, false, false, false];
    if (checkedList[0] === false) {
      setCheckedList(allTrueList);
    } else setCheckedList(allFalseList);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* 로고 */}
      <div className="mt-6 flex justify-center">
        <img src={SignupLogo} alt="로고" className="h-[2.3125rem] w-[6.25rem]" />
      </div>
      <div className="mt-14 flex h-[42.25rem] w-[34.375rem] flex-col items-center rounded-[1.25rem] border border-white bg-white shadow-2xl">
        <div className="relative flex h-full w-full flex-col">
          <div className="relative mx-[1.87rem] mt-[2.56rem] flex gap-4">
            <span className="absolute -top-1 left-6 text-[1.25rem] font-semibold">
              이용약관 동의
            </span>
          </div>

          <label className="mx-12 mt-[3.69rem] flex cursor-pointer items-center gap-3 rounded-[0.625rem] bg-[#E7EBFF] px-[0.81rem] py-[1rem]">
            <input
              type="checkbox"
              checked={checkedList[0]}
              onChange={() => toggleAllCheckbox()}
              className="h-5 w-5 rounded-sm border border-[#BABABA] checked:border-transparent checked:bg-blue-500"
            />
            <span className="font-medium"> 전체 이용약관에 동의합니다.</span>
          </label>

          <div className="mt-[1.37rem] flex flex-col gap-[1.56rem] font-sans">
            <div className="mx-12 flex justify-between">
              <label className="flex cursor-pointer items-center gap-3 px-[0.81rem]">
                <input
                  type="checkbox"
                  checked={checkedList[1]}
                  onChange={() => toggleCheckbox(1)}
                  className="h-5 w-5 rounded-sm border border-[#BABABA] checked:border-transparent checked:bg-blue-500"
                />
                <span className="font-medium">(필수) 개인정보 수집, 이용에 동의합니다.</span>
              </label>
              <button
                type="button"
                // onClick={}
              >
                <img src={FrontBtn} alt="자세히 보기" />
              </button>
            </div>
            <div className="mx-12 flex justify-between">
              <label className="flex cursor-pointer items-center gap-3 px-[0.81rem]">
                <input
                  type="checkbox"
                  checked={checkedList[2]}
                  onChange={() => toggleCheckbox(2)}
                  className="h-5 w-5 rounded-sm border border-[#BABABA] checked:border-transparent checked:bg-blue-500"
                />
                <span className="font-medium">(필수) 이용약관에 동의합니다.</span>
              </label>
              <button
                type="button"
                // onClick={}
              >
                <img src={FrontBtn} alt="자세히 보기" />
              </button>
            </div>
            <div className="mx-12 flex justify-between">
              <label className="flex cursor-pointer items-center gap-3 px-[0.81rem]">
                <input
                  type="checkbox"
                  checked={checkedList[3]}
                  onChange={() => toggleCheckbox(3)}
                  className="h-5 w-5 rounded-sm border border-[#BABABA] checked:border-transparent checked:bg-blue-500"
                />
                <span className="font-medium">(필수) 위치기반 서비스 약관에 동의합니다.</span>
              </label>
              <button
                type="button"
                // onClick={}
              >
                <img src={FrontBtn} alt="자세히 보기" />
              </button>
            </div>
            <label className="mx-12 flex cursor-pointer items-center gap-3 px-[0.81rem]">
              <input
                type="checkbox"
                checked={checkedList[4]}
                onChange={() => toggleCheckbox(4)}
                className="h-5 w-5 rounded-sm border border-[#BABABA] checked:border-transparent checked:bg-blue-500"
              />
              <span className="font-medium">(필수) 만 14세 이상입니다.</span>
            </label>
            <label className="mx-12 flex cursor-pointer items-center gap-3 px-[0.81rem]">
              <input
                type="checkbox"
                checked={checkedList[5]}
                onChange={() => toggleCheckbox(5)}
                className="h-5 w-5 rounded-sm border border-[#BABABA] checked:border-transparent checked:bg-blue-500"
              />
              <span className="font-medium text-[#BABABA]">
                (선택) 마케팅 정보 수신에 동의합니다.
              </span>
            </label>
          </div>
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-[25.5625rem]">
            <SignupBtn children={'동의하기'} onClick={onNext}  />
          </div>
        </div>
      </div>
    </div>
  );
};
