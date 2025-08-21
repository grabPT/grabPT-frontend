// import { useNavigate } from 'react-router-dom';
// import AppLogo from '@/assets/images/AppLogo.png';
// import GoogleLogo from '@/features/Login/assets//GoogleLogo.svg';
// import KakaoLogo from '@/features/Login/assets//KakaoLogo.svg';
// import NaverLogo from '@/features/Login/assets//NaverLogo.svg';
// import LoginBgLogo from '@/features/Login/assets/LoginBgLogo.svg';
// import LoginButton from '@/features/Login/components/LoginButton';
// import BackBtn from '@/features/Signup/assets/BackBtn.svg';
// import SignupLogo from '@/features/Signup/assets/SignupLogo.png';
// export type UserType = 'normal' | 'expert';
// const Login = () => {
//   const navigate = useNavigate();
//   const navigateToBack = () => navigate(-1);
//   return (
//     <div className="relative flex h-dvh w-full items-center justify-center bg-gradient-to-bl from-[#8CAFFF] to-[#FFFFFF]">
//       <div className="absolute top-0 left-0 mx-6">
//         <button onClick={navigateToBack}>
//           <img alt="뒤로가기" src={BackBtn} />
//         </button>
//       </div>
//       <div className="flex flex-col items-center justify-center">
//         {/* 로고 */}
//         {/* <div className="flex justify-center">
//           <img src={SignupLogo} alt="로고" className="h-[2.3125rem] w-[6.25rem]" />
//         </div> */}
//         <div className="relative flex h-[610px] w-[500px] flex-col items-center rounded-[1.25rem] border border-white bg-white px-16 shadow-2xl">
//           <img
//             src={LoginBgLogo}
//             alt="배경 아이콘"
//             className="absolute top-[2.63rem] right-[-1px] h-[20.75rem] w-[13.565rem] object-cover"
//           />
//           <div className="flex h-full w-full flex-col font-sans">
//             <div className="mt-8 flex items-center justify-start">
//               <img src={AppLogo} alt="로고" className="h-fit w-[5.5625rem]" />
//             </div>
//             <div className="mt-18 flex flex-col items-start justify-center gap-2">
//               <h1 className="text-[2.375rem] leading-[2.5625rem] font-bold">
//                 안녕하세요
//                 <br />
//                 Grab PT입니다
//               </h1>
//               <span className="text-[0.9375rem] leading-[2.375rem] font-semibold text-[#979797]">
//                 원하는 가격에, 원하는 방식으로 시작하는 나만의 운동 플랫폼
//               </span>
//             </div>
//             {/* 각 소셜 로그인 버튼 이건 나중에 로직 추가 에정 */}
//             <div className="mt-33 flex flex-col items-center justify-center rounded-[1.25rem]">
//               <div className="flex w-full flex-col gap-4 whitespace-pre">
//                 <div className="flex items-center justify-center">
//                   <LoginButton
//                     color="kakao"
//                     onClick={() =>
//                       (window.location.href = 'https://www.grabpt.com/oauth2/authorization/kakao')
//                     }
//                   >
//                     <div className="flex items-center gap-2">
//                       <img
//                         src={KakaoLogo}
//                         className="h-[1.875rem] w-[1.8765rem]"
//                         alt="Kakao Logo"
//                       />
//                       카카오로 시작
//                     </div>
//                   </LoginButton>
//                 </div>
//                 <div className="flex items-center justify-center">
//                   <LoginButton
//                     color="naver"
//                     onClick={() =>
//                       (window.location.href = 'https://www.grabpt.com/oauth2/authorization/naver')
//                     }
//                   >
//                     <div className="flex items-center gap-2">
//                       <img
//                         src={NaverLogo}
//                         className="h-[1.875rem] w-[1.8765rem]"
//                         alt="Naver Logo"
//                       />
//                       네이버로 시작
//                     </div>
//                   </LoginButton>
//                 </div>
//                 <div className="flex items-center justify-center">
//                   <LoginButton
//                     color="google"
//                     onClick={() =>
//                       (window.location.href = 'https://www.grabpt.com/oauth2/authorization/google')
//                     }
//                   >
//                     <div className="flex items-center gap-2">
//                       <img
//                         src={GoogleLogo}
//                         className="h-[1.875rem] w-[1.8765rem]"
//                         alt="Google Logo"
//                       />
//                       구글로 시작
//                     </div>
//                   </LoginButton>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* 밑에 주석 */}
//       <div className="absolute bottom-8 left-8 font-normal">
//         <span className="text-gray-400">최초 로그인 시 이용약관과 </span>
//         <span className="text-[#93A2EB]">개인정보 취급방침</span>,<br />
//         <span className="text-[#93A2EB]">위치기반서비스 이용약관</span>
//         <span className="text-gray-400">에 동의하는 것으로 간주합니다.</span>
//       </div>
//     </div>
//   );
// };
// export default Login;
import { useNavigate } from 'react-router-dom';

import AppLogo from '@/assets/images/AppLogo.png';
import GoogleLogo from '@/features/Login/assets//GoogleLogo.svg';
import KakaoLogo from '@/features/Login/assets//KakaoLogo.svg';
import NaverLogo from '@/features/Login/assets//NaverLogo.svg';
import LoginBgLogo from '@/features/Login/assets/LoginBgLogo.svg';
import LoginButton from '@/features/Login/components/LoginButton';
import BackBtn from '@/features/Signup/assets/BackBtn.svg';
import SignupLogo from '@/features/Signup/assets/SignupLogo.png';

export type UserType = 'normal' | 'expert';

const Login = () => {
  const navigate = useNavigate();
  const navigateToBack = () => navigate(-1);

  return (
    <div className="relative flex h-dvh w-full items-center justify-center bg-gradient-to-bl from-[#8CAFFF] to-[#FFFFFF]">
      <div className="absolute top-0 left-0 mx-6">
        <button onClick={navigateToBack}>
          <img alt="뒤로가기" src={BackBtn} />
        </button>
      </div>
      <div className="flex scale-60 flex-col items-center justify-center xl:scale-70 2xl:scale-80">
        {/* 로고 */}
        <div className="flex justify-center">
          <img src={SignupLogo} alt="로고" className="h-[2.3125rem] w-[6.25rem]" />
        </div>
        <div className="relative mt-14 flex h-[42.25rem] w-[34.375rem] flex-col items-center rounded-[1.25rem] border border-white bg-white px-16 shadow-2xl">
          <img
            src={LoginBgLogo}
            alt="배경 아이콘"
            className="absolute top-[2.63rem] right-[-1px] h-[20.75rem] w-[13.565rem] object-cover"
          />
          <div className="flex h-full w-full flex-col font-sans">
            <div className="mt-8 flex items-center justify-start">
              <img src={AppLogo} alt="로고" className="h-fit w-[5.5625rem]" />
            </div>
            <div className="mt-[5.38rem] flex flex-col items-start justify-center gap-2">
              <h1 className="text-[2.375rem] leading-[2.5625rem] font-bold">
                안녕하세요
                <br />
                Grab PT입니다
              </h1>
              <span className="text-[0.9375rem] leading-[2.375rem] font-semibold text-[#979797]">
                원하는 가격에, 원하는 방식으로 시작하는 나만의 운동 플렛폼
              </span>
            </div>

            {/* 각 소셜 로그인 버튼 이건 나중에 로직 추가 에정 */}
            <div className="mt-[8.81rem] flex flex-col items-center justify-center rounded-[1.25rem]">
              <div className="flex w-full flex-col gap-4 whitespace-pre">
                <div className="flex items-center justify-center">
                  <LoginButton
                    color="kakao"
                    onClick={() =>
                      (window.location.href = 'https://www.grabpt.com/oauth2/authorization/kakao')
                    }
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={KakaoLogo}
                        className="h-[1.875rem] w-[1.8765rem]"
                        alt="Kakao Logo"
                      />
                      카카오로 시작
                    </div>
                  </LoginButton>
                </div>
                <div className="flex items-center justify-center">
                  <LoginButton
                    color="naver"
                    onClick={() =>
                      (window.location.href = 'https://www.grabpt.com/oauth2/authorization/naver')
                    }
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={NaverLogo}
                        className="h-[1.875rem] w-[1.8765rem]"
                        alt="Naver Logo"
                      />
                      네이버로 시작
                    </div>
                  </LoginButton>
                </div>
                <div className="flex items-center justify-center">
                  <LoginButton
                    color="google"
                    onClick={() =>
                      (window.location.href = 'https://www.grabpt.com/oauth2/authorization/google')
                    }
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={GoogleLogo}
                        className="h-[1.875rem] w-[1.8765rem]"
                        alt="Google Logo"
                      />
                      구글로 시작
                    </div>
                  </LoginButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 밑에 주석 */}
      <div className="absolute bottom-8 left-8 text-xs font-light xl:text-sm 2xl:text-base 2xl:font-normal">
        <span className="text-gray-400">최초 로그인 시 이용약관과 </span>
        <span className="text-[#93A2EB]">개인정보 취급방침</span>,<br />
        <span className="text-[#93A2EB]">위치기반서비스 이용약관</span>
        <span className="text-gray-400">에 동의하는 것으로 간주합니다.</span>
      </div>
    </div>
  );
};

export default Login;
