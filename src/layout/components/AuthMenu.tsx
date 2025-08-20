import { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import Alert from '@/assets/images/Alert.png';
import Chat from '@/assets/images/Chat.png';
import HeaderProfile from '@/assets/images/HeaderProfile.png';
import Button from '@/components/Button';
import ROUTES from '@/constants/routes';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import AlarmDropdown from '@/layout/components/AlarmDropdown';
import ProfileDropdown from '@/layout/components/ProfileDropdown';
import { useAlarmStore } from '@/store/useAlarmStore';
import { useRoleStore } from '@/store/useRoleStore';
import { useUnreadStore } from '@/store/useUnreadStore';

function AuthMenu() {
  const location = useLocation();
  const navigate = useNavigate();

  const { isLoggedIn, role } = useRoleStore();
  const [isOpenProfileDropdown, setIsOpenProfileDropdown] = useState<boolean>(false);
  const [isOpenAlarmDropdown, setIsOpenAlarmDropdown] = useState<boolean>(false);
  const unreadCount = useUnreadStore((s) => s.unreadCount);
  const alarmCount = useAlarmStore((s) => s.alarmCount);

  const { data: myInfo } = useGetUserInfo();
  const profileImage = myInfo?.profileImageUrl ?? HeaderProfile;
  const nav = useNavigate();
  //url 변경될때마다 드롭다운 닫기
  useEffect(() => {
    setIsOpenAlarmDropdown(false);
    setIsOpenProfileDropdown(false);
  }, [location]);

  return (
    <div className="flex items-center">
      {/*  로그인 여부에 따른 메뉴 */}
      {isLoggedIn ? (
        <div className="flex h-full items-center gap-5">
          <div className="relative flex h-[21px] gap-[21px]">
            <div className="relative">
              {unreadCount > 0 && (
                <div className="absolute bottom-3 left-3 z-[3000] rounded-full bg-red-500 px-1.5 text-center text-[12px] text-white">
                  {unreadCount}
                </div>
              )}
              <img
                src={Chat}
                alt="채팅"
                className="h-full cursor-pointer"
                onClick={() => navigate(ROUTES.CHAT.ROOT)}
              />
            </div>
            <div className="relative">
              {alarmCount !== null && alarmCount > 0 && (
                <div className="absolute bottom-3 left-3 z-[3000] rounded-full bg-red-500 px-1.5 text-center text-[12px] text-white">
                  {alarmCount}
                </div>
              )}
              <img
                src={Alert}
                alt="알림"
                className="h-full cursor-pointer"
                onClick={() => setIsOpenAlarmDropdown((prev) => !prev)}
              />
            </div>
            {isOpenAlarmDropdown && (
              <div className="absolute top-12 -right-2.5">
                <AlarmDropdown />
              </div>
            )}
          </div>
          <div
            className="relative flex h-full items-center"
            onMouseLeave={() => setIsOpenProfileDropdown(false)}
          >
            <img
              src={profileImage}
              alt="프로필"
              className="h-[45px] w-[45px] cursor-pointer rounded-full"
              onMouseEnter={() => setIsOpenProfileDropdown(true)}
              onClick={() => {
                if (role === 'EXPERT') {
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
          <div
            className="flex h-full w-[96px] items-center justify-center"
            onClick={() => nav(ROUTES.AUTH.LOGIN)}
          >
            <Button>로그인</Button>
          </div>
        </>
      )}
    </div>
  );
}

export default AuthMenu;
