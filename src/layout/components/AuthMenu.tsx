import { useEffect, useRef, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import Alert from '@/assets/icons/AlarmIcon.svg';
import Chat from '@/assets/icons/ChatIcon.svg';
import HamburgerIcon from '@/assets/icons/HamburgerIcon';
import Button from '@/components/Button';
import ProfileImage from '@/components/ProfileImage';
import ROUTES from '@/constants/routes';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import AlarmDropdown from '@/layout/components/AlarmDropdown';
import ProfileDropdown from '@/layout/components/ProfileDropdown';
import { useAlarmStore } from '@/store/useAlarmStore';
import { useRoleStore } from '@/store/useRoleStore';
import { useUnreadStore } from '@/store/useUnreadStore';

interface AuthMenuProps {
  onOpenSidebar: () => void;
}

function AuthMenu({ onOpenSidebar }: AuthMenuProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const { isLoggedIn } = useRoleStore();
  const [isOpenProfileDropdown, setIsOpenProfileDropdown] = useState(false);
  const [isOpenAlarmDropdown, setIsOpenAlarmDropdown] = useState(false);
  const unreadCount = useUnreadStore((s) => s.unreadCount);
  const alarmCount = useAlarmStore((s) => s.alarmCount);

  const { data } = useGetUserInfo(isLoggedIn);

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
    <div className="flex items-center justify-end gap-4 sm:min-w-40 sm:gap-5">
      {isLoggedIn ? (
        <>
          {/* 채팅 + 알림 (Always visible) */}
          <div className="relative flex h-[21px] gap-4 sm:gap-5" ref={alarmRef}>
            <div className="relative">
              {unreadCount > 0 && (
                <div className="absolute bottom-3 left-2 z-[3000] rounded-full bg-red-500 px-1.5 text-center text-[12px] text-white">
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
                <div className="absolute bottom-3 left-2 z-[3000] rounded-full bg-red-500 px-1.5 text-center text-[12px] text-white">
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
              <div className="absolute top-11 -right-2.5">
                <AlarmDropdown />
              </div>
            )}
          </div>

          {/* 프로필 (Desktop Only) */}
          <div className="relative hidden h-full items-center md:flex" ref={profileRef}>
            <div
              className="h-11 w-11 cursor-pointer overflow-hidden rounded-full"
              onClick={() => setIsOpenProfileDropdown((prev) => !prev)}
            >
              <ProfileImage src={data?.profileImageUrl} alt={'프로필'} />
            </div>
            {isOpenProfileDropdown && (
              <div className="absolute top-12 right-0">
                <ProfileDropdown />
              </div>
            )}
          </div>

          {/* Hamburger (Mobile Only) */}
          <button className="flex cursor-pointer md:hidden" onClick={onOpenSidebar}>
            <HamburgerIcon className="h-6 w-6" />
          </button>
        </>
      ) : (
        <>
          {/* 로그인 버튼 (Desktop Only) */}
          <div
            className="hidden h-full w-[96px] items-center justify-center md:flex"
            onClick={() => nav(ROUTES.AUTH.LOGIN)}
          >
            <Button>로그인</Button>
          </div>

          {/* Hamburger (Mobile Only) */}
          <button className="flex cursor-pointer md:hidden" onClick={onOpenSidebar}>
            <HamburgerIcon className="h-6 w-6" />
          </button>
        </>
      )}
    </div>
  );
}

export default AuthMenu;
