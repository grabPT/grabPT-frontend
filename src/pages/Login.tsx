import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import GoogleLogo from '@/features/Login/assets//GoogleLogo.svg';
import KakaoLogo from '@/features/Login/assets//KakaoLogo.svg';
import NaverLogo from '@/features/Login/assets//NaverLogo.svg';
import PasswordEye from '@/features/Login/assets/PasswordEye.png';
import LoginButton from '@/features/Login/components/LoginButton';
import BackBtn from '@/features/Signup/assets/BackBtn.svg';
import SignupLogo from '@/features/Signup/assets/SignupLogo.png';

export type UserType = 'normal' | 'expert';

const Login = () => {
  const nav = useNavigate();
  //비밀번호 숨김 여부 관리
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="relative h-dvh w-full bg-gradient-to-bl from-[#8CAFFF] to-[#FFFFFF]">
      <div className="mx-6">
        <button onClick={() => nav('/')}>
          <img alt="뒤로가기" src={BackBtn} />
        </button>
      </div>
      <div className="flex flex-col items-center justify-center">
        {/* 로고 */}
        <div className="mt-6 flex justify-center">
          <img src={SignupLogo} alt="로고" className="h-[2.3125rem] w-[6.25rem]" />
        </div>
        <div className="mt-14 flex h-[42.25rem] w-[34.375rem] flex-col items-center rounded-[1.25rem] border border-white bg-white shadow-2xl">
          <div className="flex h-full w-full flex-col font-sans">
            <div className="mx-[4.375rem] mt-[4.38rem] flex flex-col gap-2">
              <div className="flex flex-col">
                <span className="font-semibold">이메일</span>
                <input
                  placeholder="이메일을 입력해주세요."
                  className="rounded-[0.625rem] border border-[#BDBDBD] py-[0.88rem] pl-4"
                />
              </div>
              <div className="relative flex flex-col justify-between">
                <span className="font-semibold">비밀번호</span>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="비밀번호를 입력해주세요."
                    className="w-full rounded-[0.625rem] border border-[#BDBDBD] py-[0.88rem] pr-10 pl-4"
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute top-1/2 right-4 -translate-y-1/2"
                  >
                    <img src={PasswordEye} alt="비밀번호 보기" className="h-auto w-[1.125rem]" />
                  </button>
                </div>
              </div>
              {/* 아이디 찾기/비밀번호 찾기 로직이 없음 */}
              <div className="flex justify-end gap-2 text-[0.8125rem] font-semibold whitespace-pre text-gray-400">
                <span
                  className="cursor-pointer hover:underline"
                  //  onClick={}
                >
                  아이디 찾기
                </span>
                <span
                  className="cursor-pointer hover:underline"
                  // onClick={}
                >
                  비밀번호 찾기
                </span>
              </div>
            </div>
            {/* 각 소셜 로그인 버튼 이건 나중에 로직 추가 에정 */}
            <div className="flex flex-col items-center justify-center rounded-[1.25rem]">
              <div className="mt-20 flex w-full items-center justify-center">
                <LoginButton children={'로그인'} />
              </div>
              <div className="mt-14 flex w-full flex-col gap-2 whitespace-pre">
                <div className="flex items-center justify-center">
                  <LoginButton color="kakao">
                    <div className="flex items-center gap-2">
                      <img
                        src={KakaoLogo}
                        className="h-[1.875rem] w-[1.8765rem]"
                        alt="Kakao Logo"
                      />
                      <span>카카오로 시작</span>
                    </div>
                  </LoginButton>
                </div>
                <div className="flex items-center justify-center">
                  <LoginButton color="naver">
                    <div className="flex items-center gap-2">
                      <img
                        src={NaverLogo}
                        className="h-[1.875rem] w-[1.8765rem]"
                        alt="Naver Logo"
                      />
                      <span>네이버로 시작</span>
                    </div>
                  </LoginButton>
                </div>
                <div className="flex items-center justify-center">
                  <LoginButton color="google">
                    <div className="flex items-center gap-2">
                      <img
                        src={GoogleLogo}
                        className="h-[1.875rem] w-[1.8765rem]"
                        alt="Google Logo"
                      />
                      <span>구글로 시작</span>
                    </div>
                  </LoginButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 밑에 주석 */}
      <div className="absolute bottom-8 left-8 font-normal">
        <span className="text-gray-400">최초 로그인 시 이용약관과 </span>
        <span className="text-[#93A2EB]">개인정보 취급방침</span>,<br />
        <span className="text-[#93A2EB]">위치기반서비스 이용약관</span>
        <span className="text-gray-400">에 동의하는 것으로 간주합니다.</span>
      </div>
    </div>
  );
};

export default Login;
