import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import ROUTES from '@/constants/routes';
import BackBtn from '@/features/Signup/assets/BackBtn.svg';
import AgreementStep from '@/features/Signup/components/AgreementStep';
import NickNameStep from '@/features/Signup/components/NicknameStep';
import ProInfoStep from '@/features/Signup/components/ProInfoStep';
import SportsTypeStep from '@/features/Signup/components/SportsTypeStep';
import UserInfoStep from '@/features/Signup/components/UserInfoStep';
import UserTypeStep from '@/features/Signup/components/UserTypeStep';
import { useProSignup } from '@/features/Signup/hooks/useProSignup';
import { useUserSignup } from '@/features/Signup/hooks/useUserSignup';
import { useSignupStore } from '@/store/useSignupStore';

/**
 * 회원가입페이지
 */
const Signup = () => {
  const navigate = useNavigate();
  const { role, setUserInfo, setOauthId, setOauthProvider, setUserName } = useSignupStore();

  // 🔍 URL 파라미터 확인용 테스트 코드
  useEffect(() => {
    console.log('📍 Signup Page Loaded');
    console.log('🔗 Full URL:', window.location.href);
    console.log('❓ Search Params:', window.location.search);
    const params = new URLSearchParams(window.location.search);
    params.forEach((value, key) => {
      console.log(`   👉 ${key}:`, value);
    });
  }, []);

  const [step, setStep] = useState<number>(0);
  const { mutate: userSignup } = useUserSignup();
  const { mutate: proSignup } = useProSignup();

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
      navigate(ROUTES.HOME.ROOT); // 첫 단계면 홈으로 이동
    } else if (role === 1 && step === 4) {
      // 일반 유저일 경우 전문가 페이지 숨김
      setStep((prev) => prev - 2);
    } else {
      setStep((prev) => prev - 1);
    }
  };
  // 수정: 서버에서 URL 파라미터로 넘겨주는 값 처리
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramOauthId = params.get('oauthId') || '';
    const paramOauthProvider = params.get('oauthProvider') || '';
    const paramEmail = params.get('oauthEmail') || ''; // 수정: email -> oauthEmail
    const paramUsername = params.get('oauthName') || ''; // 수정: name -> oauthName

    // URL 파라미터를 우선사용
    setOauthId(paramOauthId);
    setOauthProvider(paramOauthProvider);
    setUserName(paramUsername);

    // 이메일 처리
    if (paramOauthProvider !== 'kakao' && paramEmail !== '') {
      setUserInfo({ email: paramEmail });
    }
  }, [setOauthId, setOauthProvider, setUserName, setUserInfo]);
  // 회원가입 완료 로직
  useEffect(() => {
    if (step === 6) {
      if (role === 1) {
        const payload = useSignupStore.getState().getUserSignupDto();
        console.log('📦 보내는 user-signup payload:', payload);
        userSignup(
          {
            data: useSignupStore.getState().getUserSignupDto(),
            profileImage: useSignupStore.getState().getProfileImageInfo(),
          },
          // todo: 핸들링 컴포에서 쓸건지 훅정의에서 쓸건지 하나만 => console.log중복됨

          {
            onSuccess: (res) => {
              console.log('User signup success:', res);
              navigate(ROUTES.AUTH.CALLBACK);
            },
            onError: (err) => {
              console.error('User signup failed:', err);
              alert('회원가입 실패');
              setStep(5);
            },
          },
        );
      } else if (role === 2) {
        const payload = useSignupStore.getState().getProSignupDto();
        console.log('📦 보내는 user-signup payload:', payload);
        proSignup(
          {
            data: useSignupStore.getState().getProSignupDto(),
            profileImage: useSignupStore.getState().getProfileImageInfo(),
          },
          // todo: 핸들링 컴포에서 쓸건지 훅정의에서 쓸건지 하나만 => console.log중복됨
          {
            onSuccess: (res) => {
              console.log('Pro signup success:', res);
              navigate(ROUTES.AUTH.CALLBACK);
            },
            onError: (err) => {
              console.error('Pro signup failed:', err);
              alert('회원가입 실패');
              setStep(5);
            },
          },
        );
      }
    }
  }, [step, role, userSignup, proSignup, navigate]);

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
      {step === 3 && <ProInfoStep onNext={handleNext} />}
      {step === 4 && <SportsTypeStep onNext={handleNext} />}
      {step === 5 && <NickNameStep onNext={handleNext} />}
    </div>
  );
};

export default Signup;
