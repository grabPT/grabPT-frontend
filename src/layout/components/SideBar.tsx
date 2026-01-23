import { useEffect } from 'react';

import clsx from 'clsx';
import { NavLink, useNavigate } from 'react-router-dom';

import Alert from '@/assets/images/Alert.png';
import Chat from '@/assets/images/Chat.png';
import HeaderProfile from '@/assets/images/HeaderProfile.png';
import Button from '@/components/Button';
import ProfileImage from '@/components/ProfileImage';
import ROUTES from '@/constants/routes';
import { useLogout } from '@/features/Signup/hooks/useLogout';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import { useAlarmStore } from '@/store/useAlarmStore';
import { useRoleStore } from '@/store/useRoleStore';
import { useUnreadStore } from '@/store/useUnreadStore';
import { decodeBase64Utf8 } from '@/utils/decodeBaseUtf8';

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideBar = ({ isOpen, onClose }: SideBarProps) => {
  const navigate = useNavigate();
  const { role, isLoggedIn } = useRoleStore();
  const unreadCount = useUnreadStore((s) => s.unreadCount);
  const alarmCount = useAlarmStore((s) => s.alarmCount);
  const { data: myInfo } = useGetUserInfo();
  const profileImage = myInfo?.profileImageUrl ?? HeaderProfile;

  const { mutate: logout } = useLogout();
  const stage = import.meta.env.VITE_STAGE;

  // Logout logic replication
  const handleLogout = () => {
    let refreshToken: string;
    if (stage === 'development' || stage === 'staging') {
      refreshToken = decodeBase64Utf8(localStorage.getItem('refreshToken'));
    } else {
      const match = document.cookie
        .split('; ')
        .find((row) => row.startsWith('REFRESH_TOKEN' + '='));
      refreshToken = match ? match.split('=')[1] : '';
    }
    logout({ refreshToken });
    onClose();
  };

  const menuList = [
    {
      label: role === 'PRO' ? '매칭 현황' : '요청서 작성',
      path:
        role === 'PRO' ? ROUTES.MATCHING_STATUS.REQUESTS.ROOT : ROUTES.MATCHING_STATUS.REQUESTS.NEW,
    },
    { label: '트레이너 찾기', path: '/나중에설정' },
    { label: '내지역 센터', path: '/나중에설정' },
    { label: '카테고리', path: ROUTES.CATEGORY.ROOT },
  ];

  /* Prevent scrolling when sidebar is open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={clsx(
          'fixed inset-0 z-40 bg-black/50 transition-opacity duration-300',
          isOpen ? 'visible opacity-100' : 'invisible opacity-0',
        )}
        onClick={onClose}
      />

      {/* Sidebar Content */}
      <div
        className={clsx(
          'fixed top-0 right-0 z-50 h-full w-full bg-white shadow-xl transition-transform duration-300 ease-in-out sm:max-w-xs',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex h-full flex-col p-6">
          {/* Close Button */}
          <div className="flex justify-end">
            <button onClick={onClose} className="p-2 text-gray-500 hover:text-black">
              {/* X Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* User Profile / Auth Section */}
          <div className="mt-4 mb-8">
            {isLoggedIn ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 overflow-hidden rounded-full border border-gray-200">
                    <ProfileImage src={profileImage} alt={'프로필'} />
                  </div>
                  <div>
                    <span className="text-lg font-bold text-gray-800">
                      {myInfo?.userName || '회원님'}
                    </span>
                    <div className="text-sm text-gray-500">
                      {role === 'PRO' ? '전문가' : '일반 회원'}
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex gap-4">
                  {/* Chat Icon */}
                  <div
                    className="relative cursor-pointer"
                    onClick={() => {
                      navigate(ROUTES.CHAT.ROOT);
                      onClose();
                    }}
                  >
                    <img src={Chat} alt="채팅" className="h-8 w-8" />
                    {unreadCount > 0 && (
                      <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                        {unreadCount > 99 ? '99+' : unreadCount}
                      </div>
                    )}
                  </div>

                  {/* Alarm Icon (Placeholder for now as dropdown is complex logic) */}
                  <div
                    className="relative cursor-pointer"
                    //   onClick={() => { /* Toggle Alarm Dropdown or navigate? For now just visual */ }}
                  >
                    <img
                      src={Alert}
                      alt="알림"
                      className="h-8 w-8 opacity-50"
                      title="알림 기능은 모바일에서 준비중입니다."
                    />
                    {alarmCount !== null && alarmCount > 0 && (
                      <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                        {alarmCount > 99 ? '99+' : alarmCount}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="flex w-full items-center justify-center py-4"
                onClick={() => {
                  navigate(ROUTES.AUTH.LOGIN);
                  onClose();
                }}
              >
                <Button>로그인</Button>
              </div>
            )}
          </div>

          <hr className="mb-6 border-gray-200" />

          {/* Menu Links */}
          <nav className="flex flex-col gap-6">
            {menuList.map(({ label, path }) => (
              <NavLink
                key={label}
                to={path}
                className={({ isActive }) =>
                  clsx(
                    'hover:text-primary text-xl font-bold transition-colors',
                    isActive ? 'text-black' : 'text-gray-400',
                  )
                }
                onClick={onClose}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <hr className="my-6 border-gray-200" />

          {/* Extra Profile Links if Logged In */}
          {isLoggedIn && (
            <div className="flex flex-col gap-4">
              <div
                className="cursor-pointer text-base font-medium text-gray-600 hover:text-black"
                onClick={() => {
                  navigate(role === 'PRO' ? ROUTES.MYPAGE.PRO : ROUTES.MYPAGE.USER);
                  onClose();
                }}
              >
                내 정보
              </div>
              <div
                className="cursor-pointer text-base font-medium text-gray-600 hover:text-black"
                onClick={() => {
                  navigate(role === 'PRO' ? ROUTES.PRO_SETTLEMENT : ROUTES.USER_SETTLEMENT);
                  onClose();
                }}
              >
                {role === 'PRO' ? '정산 현황' : '결제 내역'}
              </div>
              <div
                className="cursor-pointer text-base font-medium text-gray-600 hover:text-black"
                onClick={handleLogout}
              >
                로그아웃
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SideBar;
