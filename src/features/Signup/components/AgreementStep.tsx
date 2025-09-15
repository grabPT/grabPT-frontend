import { useState } from 'react';

import { createPortal } from 'react-dom';

import FrontBtn from '@/features/Signup/assets/FrontBtn.png';
import SignupLogo from '@/features/Signup/assets/SignupLogo.png';
import AgreementModal from '@/features/Signup/components/AgreementModal';
import SignupBtn from '@/features/Signup/components/SignupBtn';
import { useSignupStore } from '@/store/useSignupStore';

interface AgreementStepProps {
  onNext: () => void;
}

const AgreementStep = ({ onNext }: AgreementStepProps) => {
  const { agreementInfo, setAgreementInfo } = useSignupStore();
  //상세 설명 모달
  const [isModalOpen, setIsModalOpen] = useState<number | null>(null);
  // checkedList
  const checkedList = [
    agreementInfo.agreedTermsId.length === 4 && agreementInfo.agreeMarketing,
    agreementInfo.agreedTermsId.includes(1),
    agreementInfo.agreedTermsId.includes(2),
    agreementInfo.agreedTermsId.includes(3),
    agreementInfo.agreedTermsId.includes(4),
    agreementInfo.agreeMarketing,
  ];
  // 전체 선택 버튼 관리
  const isAllRequiredChecked =
    agreementInfo.agreedTermsId.includes(1) &&
    agreementInfo.agreedTermsId.includes(2) &&
    agreementInfo.agreedTermsId.includes(3) &&
    agreementInfo.agreedTermsId.includes(4);
  // 체크박스 로직
  const toggleCheckbox = (index: number) => {
    if (index === 5) {
      setAgreementInfo({ ...agreementInfo, agreeMarketing: !agreementInfo.agreeMarketing });
    } else {
      const termId = index;
      const newIds = agreementInfo.agreedTermsId.includes(termId)
        ? agreementInfo.agreedTermsId.filter((id) => id !== termId)
        : [...agreementInfo.agreedTermsId, termId];
      setAgreementInfo({ ...agreementInfo, agreedTermsId: newIds });
    }
  };
  // 전체 동의 로직
  const toggleAllCheckbox = () => {
    if (!isAllRequiredChecked || !agreementInfo.agreeMarketing) {
      setAgreementInfo({ agreedTermsId: [1, 2, 3, 4], agreeMarketing: true });
    } else {
      setAgreementInfo({ agreedTermsId: [], agreeMarketing: false });
    }
  };
  // 필수 약관 동의 안하면 alert, 동의 시 onNext
  const handleNext = () => {
    if (!isAllRequiredChecked) {
      alert('필수 약관에 모두 동의해주세요');
      return;
    }
    console.log('agreementInfo', agreementInfo);
    onNext();
  };
  return (
    <div className="relative flex scale-60 flex-col items-center justify-center xl:scale-70 2xl:scale-80">
      {/* 로고 */}
      <div className="mt-6 flex justify-center">
        <img src={SignupLogo} alt="로고" className="h-[2.3125rem] w-[6.25rem]" />
      </div>
      {/* 타이틀 */}
      <div className="mt-14 flex h-[42.25rem] w-[34.375rem] flex-col items-center rounded-[1.25rem] border border-white bg-white shadow-2xl">
        <div className="flex h-full w-full flex-col">
          <div className="relative mx-[1.87rem] mt-[2.56rem] flex gap-4">
            <span className="absolute -top-1 left-6 text-[1.25rem] font-semibold">
              이용약관 동의
            </span>
          </div>
          {/* 전체 동의 */}
          <label className="mx-12 mt-[3.69rem] flex cursor-pointer items-center gap-3 rounded-[0.625rem] bg-[#E7EBFF] px-[0.81rem] py-[1rem]">
            <input
              type="checkbox"
              checked={checkedList[0]}
              onChange={() => toggleAllCheckbox()}
              className="h-5 w-5 rounded-sm border border-[#BABABA] checked:border-transparent checked:bg-blue-500"
            />
            <span className="font-medium"> 전체 이용약관에 동의합니다.</span>
          </label>
          {/* 각 동의 문항 */}
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
              <button type="button" onClick={() => setIsModalOpen(0)}>
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
              <button type="button" onClick={() => setIsModalOpen(1)}>
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
              <button type="button" onClick={() => setIsModalOpen(2)}>
                <img src={FrontBtn} alt="자세히 보기" />
              </button>
            </div>
            <div className="mx-12 flex justify-between">
              <label className="flex cursor-pointer items-center gap-3 px-[0.81rem]">
                <input
                  type="checkbox"
                  checked={checkedList[4]}
                  onChange={() => toggleCheckbox(4)}
                  className="h-5 w-5 rounded-sm border border-[#BABABA] checked:border-transparent checked:bg-blue-500"
                />
                <span className="font-medium">(필수) 만 14세 이상입니다.</span>
              </label>
              <button type="button" onClick={() => setIsModalOpen(4)}>
                <img src={FrontBtn} alt="자세히 보기" />
              </button>
            </div>
            <div className="mx-12 flex justify-between">
              <label className="flex cursor-pointer items-center gap-3 px-[0.81rem]">
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
              <button type="button" onClick={() => setIsModalOpen(4)}>
                <img src={FrontBtn} alt="자세히 보기" />
              </button>
            </div>
          </div>
          {/* 다음 버튼 */}
          <div className="absolute bottom-12 left-1/2 w-[25.5625rem] -translate-x-1/2 transform">
            <SignupBtn onClick={handleNext}>동의하기</SignupBtn>
          </div>
        </div>
        {/* 상세 설명 모달 */}
        {isModalOpen !== null &&
          createPortal(
            <AgreementModal index={isModalOpen} onClose={() => setIsModalOpen(null)} />,
            document.body,
          )}
      </div>
    </div>
  );
};

export default AgreementStep;
