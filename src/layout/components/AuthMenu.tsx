import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { getAccessToken } from '@/apis/test';
import Alert from '@/assets/images/Alert.png';
import Chat from '@/assets/images/Chat.png';
import HeaderProfile from '@/assets/images/HeaderProfile.png';
import Button from '@/components/Button';
import ROUTES from '@/constants/routes';
import ProfileDropdown from '@/layout/components/ProfileDropdown';
import { useUserRoleStore } from '@/store/useUserRoleStore';

function AuthMenu() {
  const navigate = useNavigate();

  const { isLoggedIn, LogIn, LogOut, setUserId, isExpert, setUser, setExpert } = useUserRoleStore();
  const [isOpenProfileDropdown, setIsOpenProfileDropdown] = useState<boolean>(false);

  return (
    <div className="flex items-center">
      {/* 유저로 로그인 */}
      <button
        type="button"
        onClick={() => {
          getAccessToken(2);
          setUserId(2);
          LogIn();
          setUser();
        }}
        className="mr-3 rounded-full bg-orange-300 p-2 text-sm text-white"
      >
        U
      </button>
      {/* expert로 로그인*/}
      <button
        type="button"
        onClick={() => {
          getAccessToken(61);
          LogIn();
          setExpert();
        }}
        className="mr-6 cursor-pointer rounded-full bg-orange-600 p-2 text-sm text-white"
      >
        E
      </button>
      <button
        type="button"
        onClick={() => {
          setUserId(null);
          LogOut();
        }}
        className="mr-6 cursor-pointer rounded-full bg-red-500 p-2 text-sm text-white"
      >
        LogOut
      </button>

      {/*  로그인 여부에 따른 메뉴 */}
      {isLoggedIn ? (
        <div className="flex h-full items-center gap-5">
          <div className="flex h-[21px] gap-[21px]">
            <img
              src={Chat}
              alt="채팅"
              className="cursor-pointer"
              onClick={() => navigate(ROUTES.CHAT.ROOT)}
            />
            <img
              src={Alert}
              alt="알림"
              className="cursor-pointer"
              onClick={() => navigate(ROUTES.HOME.ROOT)}
            />
          </div>
          <div
            className="relative flex h-full items-center"
            onMouseLeave={() => setIsOpenProfileDropdown(false)}
          >
            <img
              src={HeaderProfile}
              alt="프로필"
              className="h-[45px] w-[45px] cursor-pointer"
              onMouseEnter={() => setIsOpenProfileDropdown(true)}
              onClick={() => {
                if (isExpert) {
                  navigate(ROUTES.MYPAGE.EXPERT);
                } else {
                  navigate(ROUTES.MYPAGE.USER);
                }
              }}
            />
            {isOpenProfileDropdown && (
              <div className="absolute top-full right-0">
                <ProfileDropdown />
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="flex h-full w-[96px] items-center justify-center">
            <Link to={ROUTES.AUTH.LOGIN} className="font-extrabold text-black">
              로그인
            </Link>
          </div>
          <Button>
            <Link to={ROUTES.AUTH.SIGNUP} className="text-white">
              회원가입
            </Link>
          </Button>
        </>
      )}
    </div>
  );
}

export default AuthMenu;
