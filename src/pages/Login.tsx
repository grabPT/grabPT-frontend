import { useNavigate } from 'react-router-dom';

import GoogleLogo from '@/features/Login/assets//GoogleLogo.svg';
import KakaoLogo from '@/features/Login/assets//KakaoLogo.svg';
import NaverLogo from '@/features/Login/assets//NaverLogo.svg';
import { LoginBtn } from '@/features/Login/components/LoginBtn';
import BackBtn from '@/features/Signup/assets/BackBtn.png';
import SignupLogo from '@/features/Signup/assets/SignupLogo.png';

export type UserType = 'normal' | 'expert';
export const Login = () => {
  const nav = useNavigate();
  return (
    <div className="relative h-dvh w-full bg-gradient-to-bl from-[#8CAFFF] to-[#FFFFFF]">
      {/* 본문 (약관/정보입력/거주지 선택 등) */}

      <div className="flex flex-col items-center justify-center">
        {/* 로고 */}
        <div className="mt-[6.5rem] flex justify-center">
          <img src={SignupLogo} alt="로고" className="h-[2.3125rem] w-[6.25rem]" />
        </div>
        <div className="mt-[2.06rem] flex h-[42.25rem] w-[34.375rem] flex-col items-center rounded-[1.25rem] border border-white bg-white shadow-2xl">
          <div className="flex h-full w-full flex-col font-sans">
            <div className="mt-[2.56rem] ml-[1.87rem] flex gap-4">
              <button>
                <img src={BackBtn} alt="뒤로가기" onClick={() => nav('/')} />
              </button>
            </div>
            <div className="mx-[6.5rem] mt-[2.06rem] flex flex-col gap-2">
              <div className="flex flex-col">
                <span className="font-semibold">이메일</span>
                <input
                  placeholder="이메일을 입력해주세요."
                  className="rounded-[0.625rem] border border-[#BDBDBD] py-[0.88rem] pl-4"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">비밀번호</span>
                <input
                  placeholder="비밀번호를 입력해주세요."
                  className="rounded-[0.625rem] border border-[#BDBDBD] py-[0.88rem] pl-4"
                />
              </div>
              <div className="flex justify-end gap-2 text-[0.8125rem] font-semibold whitespace-pre text-gray-400">
                <span 
                className='hover:underline cursor-pointer'
                //  onClick={}
                 >아이디 찾기</span>
                <span 
                className='hover:underline cursor-pointer' 
                // onClick={}
                >비밀번호 찾기</span>
              </div>
            </div>
            <div className="mx-[6.5rem] flex flex-col items-center justify-center rounded-[1.25rem]">
              <div className="mt-20 w-full">
                <LoginBtn children={'로그인'} />
              </div>
              <div className="mt-14 flex w-full flex-col gap-2 whitespace-pre">
                <div className="flex items-center justify-center">
                  <LoginBtn color="kakao">
                    <div className="flex items-center gap-2">
                      <img src={KakaoLogo} className="h-5 w-5" alt="Kakao Logo" />
                      <span>카카오로 시작</span>
                    </div>
                  </LoginBtn>
                </div>
                <div className="flex items-center justify-center">
                  <LoginBtn color="naver">
                    <div className="flex items-center gap-2">
                      <img src={NaverLogo} className="h-5 w-5" alt="Naver Logo" />
                      <span>네이버로 시작</span>
                    </div>
                  </LoginBtn>
                </div>
                <div className="flex items-center justify-center">
                  <LoginBtn color="google">
                    <div className="flex items-center gap-2">
                      <img src={GoogleLogo} className="h-5 w-5" alt="Google Logo" />
                      <span>구글로 시작</span>
                    </div>
                  </LoginBtn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-8 font-normal">
        <span className='text-gray-400'>최초 로그인 시 이용약관과 </span>
        <span className="text-[#93A2EB]">개인정보 취급방침</span>,<br />
        <span className="text-[#93A2EB]">위치기반서비스 이용약관</span>
        <span className='text-gray-400'>에 동의하는 것으로 간주합니다.</span>
      </div>
    </div>
  );
};
