import { useEffect, useRef, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import Alert from '@/assets/images/Alert.png';
import Chat from '@/assets/images/Chat.png';
import Button from '@/components/Button';
import ProfileImage from '@/components/ProfileImage';
import ROUTES from '@/constants/routes';
import AlarmDropdown from '@/layout/components/AlarmDropdown';
import ProfileDropdown from '@/layout/components/ProfileDropdown';
import { useAlarmStore } from '@/store/useAlarmStore';
import { useRoleStore } from '@/store/useRoleStore';
import { useUnreadStore } from '@/store/useUnreadStore';

function AuthMenu() {
  const location = useLocation();
  const navigate = useNavigate();

  const { isLoggedIn } = useRoleStore();
  const [isOpenProfileDropdown, setIsOpenProfileDropdown] = useState(false);
  const [isOpenAlarmDropdown, setIsOpenAlarmDropdown] = useState(false);
  const unreadCount = useUnreadStore((s) => s.unreadCount);
  const alarmCount = useAlarmStore((s) => s.alarmCount);

  const nav = useNavigate();

  // ✅ ref 정의
  const profileRef = useRef<HTMLDivElement>(null);
  const alarmRef = useRef<HTMLDivElement>(null);

  // URL 변경 시 드롭다운 닫기
  useEffect(() => {
    setIsOpenAlarmDropdown(false);
    setIsOpenProfileDropdown(false);
  }, [location]);

  // ✅ 영역 밖 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsOpenProfileDropdown(false);
      }
      if (alarmRef.current && !alarmRef.current.contains(e.target as Node)) {
        setIsOpenAlarmDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center">
      {isLoggedIn ? (
        <div className="flex h-full items-center gap-5">
          {/* 채팅 + 알림 */}
          <div className="relative flex h-[21px] gap-[21px]" ref={alarmRef}>
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

          {/* 프로필 */}
          <div className="relative flex h-full items-center" ref={profileRef}>
            <div
              className="h-[45px] w-[45px] cursor-pointer overflow-hidden rounded-full"
              onClick={() => setIsOpenProfileDropdown((prev) => !prev)}
            >
              <ProfileImage src={undefined} alt="프로필" />
            </div>
            {isOpenProfileDropdown && (
              <div className="absolute top-full right-0">
                <ProfileDropdown />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          className="flex h-full w-[96px] items-center justify-center"
          onClick={() => nav(ROUTES.AUTH.LOGIN)}
        >
          <Button>로그인</Button>
        </div>
      )}
    </div>
  );
}

export default AuthMenu;
