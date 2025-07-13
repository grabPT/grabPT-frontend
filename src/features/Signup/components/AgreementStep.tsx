import { useCallback, useState } from 'react';

import FrontBtn from '@/features/Signup/assets/FrontBtn.png';
import SignupLogo from '@/features/Signup/assets/SignupLogo.png';
import { AgreementModal } from '@/features/Signup/components/AgreementModal';
import SignupBtn from '@/features/Signup/components/SignupBtn';

interface IAgreementStep {
  onNext: () => void;
}

export const AgreementStep = ({ onNext }: IAgreementStep) => {
  //상세 설명 모달
    const [isModalOpen, setIsModalOpen] = useState<keyof typeof checked | null>(null);
  const agreementList = [
    {
      key: 'privacy',
      label: '(필수) 개인정보 수집, 이용에 동의합니다.',
      required: true,
    },
    {
      key: 'terms',
      label: '(필수) 이용약관에 동의합니다.',
      required: true,
    },
    {
      key: 'location',
      label: '(필수) 위치기반 서비스 약관에 동의합니다.',
      required: true,
    },
    {
      key: 'age',
      label: '(필수) 만 14세 이상입니다.',
      required: true,
    },
    {
      key: 'marketing',
      label: '(선택) 마케팅 정보 수신에 동의합니다.',
      required: false,
    },
  ] as const;
  // 체크박스 상태 관리
  const [checked, setChecked] = useState({
    all: false,
    privacy: false,
    terms: false,
    location: false,
    age: false,
    marketing: false,
  });
  //버튼 관리용
const isAllRequiredChecked = checked.privacy && checked.terms && checked.location && checked.age;
const toggleCheckbox = (key: keyof typeof checked) => {
  setChecked(prev => ({
    ...prev,
    [key]: !prev[key],
  }));
};
  // 전체 동의 로직
const toggleAllCheckbox = () => {
  const newValue = !checked.all;
    setChecked({
      all: newValue,
      privacy: newValue,
      terms: newValue,
      location: newValue,
      age: newValue,
      marketing: newValue,
    });
};
  //모달 다딕 로직
  const onCloseModal = useCallback(() => {
    setIsModalOpen(null);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center">
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
              checked={checked['all']}
              onChange={() => toggleAllCheckbox()}
              className="h-5 w-5 rounded-sm border border-[#BABABA] checked:border-transparent checked:bg-blue-500"
            />
            <span className="font-medium"> 전체 이용약관에 동의합니다.</span>
          </label>
          {/* 각 동의 문항 */}
          <div className="mt-[1.37rem] flex flex-col gap-[1.56rem] font-sans">
            {agreementList.map(({ key, label, required }) => (
              <div key={key} className="mx-12 flex justify-between">
                <label className="flex cursor-pointer items-center gap-3 px-[0.81rem]">
                  <input
                    type="checkbox"
                    checked={checked[key]}
                    onChange={() => toggleCheckbox(key)}
                    className="h-5 w-5 rounded-sm border border-[#BABABA] checked:border-transparent checked:bg-blue-500"
                  />
                  <span className={`font-medium ${!required ? 'text-[#BABABA]' : ''}`}>
                    {label}
                  </span>
                </label>
                <button type="button" onClick={() => setIsModalOpen(key)}>
                  <img src={FrontBtn} alt="자세히 보기" />
                </button>
              </div>
            ))}{' '}
          </div>
          {/* 다음 버튼 */}
          <div className="absolute bottom-12 left-1/2 w-[25.5625rem] -translate-x-1/2 transform">
            <SignupBtn
              onClick={() => {
                if (isAllRequiredChecked) {
                  onNext();
                } else {
                  alert('필수 약관에 모두 동의해 주세요.');
                }
              }}
            >
              동의하기
            </SignupBtn>
          </div>
        </div>
        {/* 상세 설명 모달 */}
        {isModalOpen !== null && <AgreementModal modalKey={isModalOpen} onClose={onCloseModal} />}
      </div>
    </div>
  );
};
