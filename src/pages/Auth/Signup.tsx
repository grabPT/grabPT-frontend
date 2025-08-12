import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import BackBtn from '@/features/Signup/assets/BackBtn.svg';
import AgreementStep from '@/features/Signup/components/AgreementStep';
import ExpertInfoStep from '@/features/Signup/components/ExpertInfoStep';
import NickNameStep from '@/features/Signup/components/NicknameStep';
import SportsTypeStep from '@/features/Signup/components/SportsTypeStep';
import UserInfoStep from '@/features/Signup/components/UserInfoStep';
import UserTypeStep from '@/features/Signup/components/UserTypeStep';
import { useProSignup } from '@/features/Signup/hooks/useProSignup';
import { useUserSignup } from '@/features/Signup/hooks/useUserSignup';
import { useSignupStore } from '@/store/useSignupStore';

const Signup = () => {
  const nav = useNavigate();
  const { role, setUserInfo, setOauthId, setOauthProvider, setUserName } = useSignupStore();
  const [step, setStep] = useState<number>(0);
  const { mutate: userSignup } = useUserSignup();
  const { mutate: proSignup } = useProSignup();


// 특정 쿠키 값 가져오기
function getCookieValue(name:string) {
  const match = document.cookie
    .split('; ')
    .find(row => row.startsWith(name + '='));
  return match ? match.split('=')[1] : '';
}

// Base64 → UTF-8 문자열 변환
function decodeBase64Utf8(base64String:string) {
  if (!base64String) return '';
  const binary = atob(base64String); // 표준 Base64 → binary string
  const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
  return new TextDecoder().decode(bytes); // UTF-8 문자열로 변환
}
// 사용 예시
const email = decodeBase64Utf8(getCookieValue('oauthEmail'));
const name = decodeBase64Utf8(getCookieValue('oauthName'));
const oauthId = decodeBase64Utf8(getCookieValue('oauthId'));
const provider = decodeBase64Utf8(getCookieValue('oauthProvider'));

console.log({ email, name, oauthId, provider });



  // const getCookieValue = (key: string): string => {
  //   const rawValue =
  //     document.cookie
  //       .split('; ')
  //       .map((cookie) => cookie.split('='))
  //       .find(([cookieKey]) => cookieKey === key)?.[1] || '';

  //   return decodeURIComponent(rawValue);
  // };

  const handleNext = () => {
    if (role === 2 && step === 2) {
      // 전문가
      setStep(3);
    } else if (role === 1 && step === 2) {
      // 일반 유저
      setStep(4);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handleBackClick = () => {
    if (step <= 0) {
      nav('/'); // 첫 단계면 홈으로 이동
    } else if (role === 1 && step === 4) {
      // 일반 유저일 경우 전문가 페이지 숨김
      setStep((prev) => prev - 2);
    } else {
      setStep((prev) => prev - 1);
    }
  };

  useEffect(() => {
    setOauthId(decodeBase64Utf8(getCookieValue('oauthId') || ''));
    setOauthProvider(decodeBase64Utf8(getCookieValue('oauthProvider') || ''));
    setUserName(decodeBase64Utf8(getCookieValue('oauthName') || ''));
    setUserInfo({ email: decodeBase64Utf8(getCookieValue('oauthEmail') || '' )});
    console.log('쿠키 값 확인:', {
      oauthId: decodeBase64Utf8(getCookieValue('oauthId')),
      oauthProvider: decodeBase64Utf8(getCookieValue('oauthProvider')),
      oauthName: decodeBase64Utf8(getCookieValue('oauthName')),
      oauthEmail: decodeBase64Utf8(getCookieValue('oauthEmail')),
    });
    if (step === 6) {
      if (role === 1) {
        const payload = useSignupStore.getState().getUserSignupDto();

        console.log('📦 보내는 user-signup payload:', payload); //
        userSignup(
          {
            data: useSignupStore.getState().getUserSignupDto(),
            profileImage: useSignupStore.getState().getProfileImageInfo(),
          },
          {
            onSuccess: (res) => {
              console.log('User signup success:', res);
              nav('/');
            },
            onError: (err) => {
              console.error('User signup failed:', err);
            },
          },
        );
      } else if (role === 2) {
        proSignup(useSignupStore.getState().getProSignupDto(), {
          onSuccess: (res) => {
            console.log('Pro signup success:', res);
            nav('/');
          },
          onError: (err) => {
            console.error('Pro signup failed:', err);
          },
        });
      }
    }
  }, [
    nav,
    proSignup,
    role,
    setOauthId,
    setOauthProvider,
    setUserInfo,
    setUserName,
    step,
    userSignup,
  ]);

  return (
    <div className="relative flex h-dvh w-full items-center justify-center bg-gradient-to-bl from-[#8CAFFF] to-[#FFFFFF]">
      {/* 뒤로 가기 버튼 */}
      <div className="absolute top-0 left-0 mx-6">
        <button onClick={handleBackClick}>
          <img alt="뒤로가기" src={BackBtn} />
        </button>
      </div>

      {/* 본문 (약관/정보입력/거주지 선택 등) */}
      {step === 0 && <AgreementStep onNext={handleNext} />}
      {step === 1 && <UserTypeStep onNext={handleNext} />}
      {step === 2 && <UserInfoStep onNext={handleNext} />}
      {step === 3 && <ExpertInfoStep onNext={handleNext} />}
      {step === 4 && <SportsTypeStep onNext={handleNext} />}
      {step === 5 && <NickNameStep onNext={handleNext} />}
    </div>
  );
};

export default Signup;
