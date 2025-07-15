import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import Alert from '@/assets/images/Alert.png';
import Chat from '@/assets/images/Chat.png';
import HeaderProfile from '@/assets/images/HeaderProfile.png';
import Button from '@/components/Button';
import ROUTES from '@/constants/routes';
import ProfileDropdown from '@/layout/components/ProfileDropdown';
import { useUserRoleStore } from '@/store/useUserRoleStore';

function AuthMenu() {
  const navigate = useNavigate();

  const { isLoggedIn, isExpert, toggleExpert } = useUserRoleStore();
  const [isOpenProfileDropdown, setIsOpenProfileDropdown] = useState<boolean>(true);

  return (
    <div className="flex items-center">
      {/* 유저타입 토글 버튼. 추후 api연동 후 삭제*/}
      <button
        type="button"
        onClick={toggleExpert}
        className="mr-6 rounded-md bg-blue-600 px-3 py-1 text-sm text-white"
      >
        {isExpert ? 'Expert' : 'User'}
      </button>

      {/*  로그인 여부에 따른 메뉴 */}
      {isLoggedIn ? (
        <div className="flex h-full items-center gap-5">
          <div className="flex h-[21px] gap-[21px]">
            <img
              src={Chat}
              alt="채팅"
              className="cursor-pointer"
              onClick={() => navigate(ROUTES.HOME.ROOT)}
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
