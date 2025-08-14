import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { getUnreadCount } from '@/apis/getUnreadCount';
import { getAccessToken } from '@/apis/test';
import Alert from '@/assets/images/Alert.png';
import Chat from '@/assets/images/Chat.png';
import HeaderProfile from '@/assets/images/HeaderProfile.png';
import Button from '@/components/Button';
import ROUTES from '@/constants/routes';
import { getAlarmList } from '@/layout/apis/alarm';
import AlarmDropdown from '@/layout/components/AlarmDropdown';
import ProfileDropdown from '@/layout/components/ProfileDropdown';
import { useAlarmStore } from '@/store/useAlarmStore';
import { useUnreadStore } from '@/store/useUnreadStore';
import { useUserRoleStore } from '@/store/useUserRoleStore';

function AuthMenu() {
  const navigate = useNavigate();

  const { isLoggedIn, LogIn, LogOut, setUserId, isExpert, setUser, setExpert } = useUserRoleStore();
  const [isOpenProfileDropdown, setIsOpenProfileDropdown] = useState<boolean>(false);
  const [isOpenAlarmDropdown, setIsOpenAlarmDropdown] = useState<boolean>(false);
  const unreadCount = useUnreadStore((s) => s.unreadCount);
  const alarmCount = useAlarmStore((s) => s.alarmCount);
  return (
    <div className="flex items-center">
      {/* 유저로 로그인 */}
      <button
        type="button"
        onClick={async () => {
          getAccessToken(5);
          setUserId(5);
          LogIn();
          setUser();
          // 초기 알람 세팅
          const initialAlarm = await getAlarmList();
          useAlarmStore.getState().setAlarmCount(initialAlarm.result.length);
          // 초기 안 읽은 개수 세팅
          const initial = await getUnreadCount();
          useUnreadStore.getState().setUnReadCount(initial.result);
          console.log(`현재unreadCount : ${initial.result}`);
        }}
        className="mr-3 rounded-full bg-orange-300 p-2 text-sm text-white"
      >
        2
      </button>
      <button
        type="button"
        onClick={async () => {
          await getAccessToken(3);
          setUserId(3);
          LogIn();
          setUser();
          // 초기 알람 세팅
          const initialAlarm = await getAlarmList();
          useAlarmStore.getState().setAlarmCount(initialAlarm.result.length);
          // 초기 안 읽은 개수 세팅
          const initial = await getUnreadCount(); // 4) 초기 unread 1회 호출
          useUnreadStore.getState().setUnReadCount(initial.result);
        }}
        className="mr-3 rounded-full bg-orange-300 p-2 text-sm text-white"
      >
        3
      </button>
      {/* expert로 로그인*/}
      <button
        type="button"
        onClick={async () => {
          await getAccessToken(156);
          setUserId(156);
          LogIn();
          setExpert();
          // 초기 알람 세팅
          const initialAlarm = await getAlarmList();
          useAlarmStore.getState().setAlarmCount(initialAlarm.result.length);
          // 초기 안 읽은 개수 세팅
          const initial = await getUnreadCount(); // 4) 초기 unread 1회 호출
          useUnreadStore.getState().setUnReadCount(initial.result);
        }}
        className="mr-6 cursor-pointer rounded-full bg-orange-600 p-2 text-sm text-white"
      >
        E(61)
      </button>
      <button
        type="button"
        onClick={() => {
          setUserId(null);
          localStorage.removeItem('accessToken');
          LogOut();
        }}
        className="mr-6 cursor-pointer rounded-full bg-red-500 p-2 text-sm text-white"
      >
        LogOut
      </button>

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
