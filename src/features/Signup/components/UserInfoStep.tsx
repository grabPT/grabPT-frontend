import { useEffect, useState } from 'react';

import Button from '@/components/Button';
import SignupLogo from '@/features/Signup/assets/SignupLogo.png';
import SignupBtn from '@/features/Signup/components/SignupBtn';

interface UserInfoStepProps {
  onNext: () => void;
}

const UserInfoStep = ({ onNext }: UserInfoStepProps) => {
  //주소 api 사용
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [postModalOpen, setPostModalOpen] = useState(false);
  const handleAddressSearch = () => {
    if (!(window as any).daum || !(window as any).daum.Postcode) {
      alert('주소 검색 API가 아직 로드되지 않았습니다.');
      return;
    }
    setPostModalOpen(true);
  };
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (postModalOpen && (window as any).daum && (window as any).daum.Postcode) {
      const container = document.getElementById('daum-postcode') as HTMLElement;
      if (container) {
        container.innerHTML = ''; // 이전 내용 제거
        new (window as any).daum.Postcode({
          oncomplete: function (data: any) {
            const addr = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;
            const loca = data.bname;
            setAddress(addr);
            setLocation(loca);
            setPostModalOpen(false);
          },
          onclose: function () {
            setPostModalOpen(false);
          },
        }).embed(container);
      }
    }
  }, [postModalOpen]);

  const [VerifyNumberCheckResult, setVerifyNumberCheckResult] = useState<boolean | null>(null);
  const [VerifyNumber, _setVerifyNumber] = useState(''); //사용하지 않는 setVerifyNumber _처리
  const handleVerifyNumberCheck = () => {
    //나중에 서버에서 인증번호 확인 로직 추가
    if (VerifyNumber === '123456') {
      setVerifyNumberCheckResult(true);
    } else {
      setVerifyNumberCheckResult(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      {/* 로고 */}
      <div className="mt-6 flex justify-center">
        <img src={SignupLogo} alt="로고" className="h-[2.3125rem] w-[6.25rem]" />
      </div>
      <div className="mt-14 flex h-[42.25rem] w-[34.375rem] flex-col items-center rounded-[1.25rem] border border-white bg-white shadow-2xl">
        <div className="relative flex h-full w-full flex-col items-center">
          <div className="mx-[4.375rem] mt-16 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <span className="font-semibold">이메일</span>
              <input
                type="text"
                placeholder="이메일"
                className="rounded-[0.625rem] border border-[#BDBDBD] py-[0.8rem] pl-4"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">주소</span>
              <div className="flex flex-col gap-2.5">
                <div className="flex h-[3.125rem] w-[25.625rem] items-center justify-between">
                  <input
                    type="text"
                    placeholder="주소"
                    value={address}
                    className="w-[18.25rem] rounded-[0.625rem] border border-[#BDBDBD] py-[0.8rem] pl-4"
                  />
                  <Button className="h-full text-white" onClick={handleAddressSearch}>
                    주소 검색
                  </Button>
                </div>
                <div className="flex h-[3.125rem] w-[25.625rem] items-center justify-between">
                  <input
                    type="text"
                    placeholder="상세 주소"
                    className="w-[18.25rem] rounded-[0.625rem] border border-[#BDBDBD] py-[0.8rem] pl-4"
                  />
                  <div className="flex w-[98px] items-center justify-center rounded-[0.625rem] text-[15px] font-semibold">
                    {location && `(${location})`}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-13 font-semibold">
                <span>국가</span>
                <span>전화번호</span>
              </div>
              <div className="relative flex items-center rounded-[0.625rem] border border-[#BDBDBD]">
                <div className="inline-flex border-r border-[#BDBDBD] px-3 py-[0.8rem]">
                  <label htmlFor="country-code"></label>
                  <select
                    aria-label="지역선택"
                    id="country-code"
                    name="countryCode"
                    className="text-[#707070]"
                  >
                    <option value="+82">+82</option>
                    <option value="+1">+1</option>
                    <option value="+81">+81</option>
                    <option value="+86">+86</option>
                  </select>
                </div>
                <input
                  type="tel"
                  placeholder="3334586492"
                  // onSubmit={}
                  className="ml-[1.25rem]"
                />
                <button className="absolute top-1/2 right-4 flex h-7 w-[4.375rem] -translate-y-1/2 items-center justify-center rounded-[3.125rem] bg-[color:var(--color-button)] text-[0.625rem] font-semibold text-white hover:bg-[color:var(--color-button-hover)] active:bg-[color:var(--color-button-pressed)]">
                  인증요청
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">인증번호</span>
              <div className="relative flex items-center justify-between">
                <input
                  placeholder="XXXXXX"
                  className={`w-full rounded-[0.625rem] border py-[0.8rem] pl-4 ${
                    VerifyNumberCheckResult === true
                      ? 'border-green-500'
                      : VerifyNumberCheckResult === false
                        ? 'border-red-500'
                        : 'border-[#BDBDBD]'
                  }`}
                ></input>
                <button
                  className="absolute top-1/2 right-4 flex h-7 w-[4.375rem] -translate-y-1/2 items-center justify-center rounded-[3.125rem] bg-[color:var(--color-button)] text-[0.625rem] font-semibold text-white hover:bg-[color:var(--color-button-hover)] active:bg-[color:var(--color-button-pressed)]"
                  onClick={handleVerifyNumberCheck}
                >
                  인증확인
                </button>
              </div>
              <div className="mt-1 flex flex-col gap-2">
                {VerifyNumberCheckResult === true && (
                  <p className="mt-1 text-sm text-green-600">인증되었습니다</p>
                )}
                {VerifyNumberCheckResult === false && (
                  <p className="mt-1 text-sm text-red-600">인증번호가 일치하지 않습니다</p>
                )}
              </div>
            </div>
          </div>
          <div className="absolute bottom-12 left-1/2 w-[25.5625rem] -translate-x-1/2 transform">
            <SignupBtn onClick={onNext}>다음</SignupBtn>
          </div>
        </div>
        {postModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
            <div
              id="daum-postcode"
              className="relative flex h-[600px] w-[600px] items-center justify-center rounded-[0.625rem] bg-white shadow-lg"
            />
            <button
              onClick={() => setPostModalOpen(false)}
              className="absolute top-[16rem] right-[19.5rem] h-6 w-6 cursor-pointer rounded-full text-gray-500 hover:bg-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfoStep;
