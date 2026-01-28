import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import LoadingMuscle from '@/components/LoadingMuscle';
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
import { decodeCookie } from '@/utils/decodeCookie';

/**
 * 회원가입페이지
 */
const Signup = () => {
  const navigate = useNavigate();
  const { role, setUserInfo, setOauthId, setOauthProvider, setUserName } = useSignupStore();
  const [step, setStep] = useState<number>(0);
  const { mutate: userSignup, isPending: isUserPending } = useUserSignup();
  const { mutate: proSignup, isPending: isProPending } = useProSignup();

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

  useEffect(() => {
    const stage = import.meta.env.VITE_STAGE;
    let paramOauthId = '';
    let paramOauthProvider = '';
    let paramEmail = '';
    let paramUsername = '';

    if (stage === 'development' || stage === 'staging') {
      const params = new URLSearchParams(window.location.search);
      paramOauthId = params.get('oauthId') || '';
      paramOauthProvider = params.get('oauthProvider') || '';
      paramEmail = params.get('oauthEmail') || '';
      paramUsername = params.get('oauthName') || '';
    } else {
      // 배포 환경: 쿠키에서 값 추출
      // decodeCookie 유틸이 decodeURIComponent를 포함하고 있으므로 인코딩된 값도 처리됨
      paramOauthId = decodeCookie('oauthId');
      paramOauthProvider = decodeCookie('oauthProvider');
      paramEmail = decodeCookie('oauthEmail');
      paramUsername = decodeCookie('oauthName');
    }

    setOauthId(paramOauthId);
    setOauthProvider(paramOauthProvider);
    setUserName(paramUsername);

    // provider가 카카오고 email이 비어있으면
    if (paramOauthProvider !== 'kakao' && paramEmail !== '') {
      setUserInfo({ email: paramEmail });
    }
  }, [setOauthId, setOauthProvider, setUserName, setUserInfo]);

  // 회원가입 완료 로직
  useEffect(() => {
    if (step === 6) {
      if (role === 1) {
        userSignup(
          {
            data: useSignupStore.getState().getUserSignupDto(),
            profileImage: useSignupStore.getState().getProfileImageInfo(),
          },
          {
            onSuccess: () => {
              navigate(ROUTES.AUTH.LOGIN, {
                state: {
                  toastMessage: '회원가입에 성공하였습니다! 다시 로그인해주세요',
                },
              });
            },
            onError: (err) => {
              alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
              console.error('회원가입 실패 이유:', err);
              navigate(ROUTES.HOME.ROOT);
            },
          },
        );
      } else if (role === 2) {
        proSignup(
          {
            data: useSignupStore.getState().getProSignupDto(),
            profileImage: useSignupStore.getState().getProfileImageInfo(),
          },
          {
            onSuccess: () => {
              navigate(ROUTES.AUTH.LOGIN, {
                state: {
                  toastMessage: '회원가입에 성공하였습니다! 다시 로그인해주세요',
                },
              });
            },
            onError: (err) => {
              alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
              console.error('회원가입 실패 이유:', err);
              navigate(ROUTES.HOME.ROOT);
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
      {(isUserPending || isProPending) && <LoadingMuscle />}
    </div>
  );
};

export default Signup;
