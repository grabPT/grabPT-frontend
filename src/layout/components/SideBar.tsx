import { useEffect, useState } from 'react';

import clsx from 'clsx';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import XIcon from '@/assets/icons/XIcon';
import HeaderProfile from '@/assets/images/HeaderProfile.png';
import Button from '@/components/Button';
import ProfileImage from '@/components/ProfileImage';
import ROUTES, { urlFor } from '@/constants/routes';
import { SPORTS } from '@/constants/sports';
import { useLogout } from '@/features/Signup/hooks/useLogout';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import { useRoleStore } from '@/store/useRoleStore';
import { decodeBase64Utf8 } from '@/utils/decodeBaseUtf8';

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideBar = ({ isOpen, onClose }: SideBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, isLoggedIn } = useRoleStore();
  const { data: myInfo } = useGetUserInfo();
  const profileImage = myInfo?.profileImageUrl ?? HeaderProfile;

  const { mutate: logout } = useLogout();
  const stage = import.meta.env.VITE_STAGE;

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

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
    // Category is handled separately
  ];

  /* 
    Calculate if ANY of the sidebar items are active.
    This includes the paths in menuList AND the Category path.
  */
  const isAnyActive =
    menuList.some((item) => location.pathname === item.path) ||
    location.pathname.startsWith(ROUTES.CATEGORY.ROOT);

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
          'fixed top-0 right-0 z-50 h-full w-full bg-white shadow-xl transition-transform duration-300 ease-in-out sm:max-w-md',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="scrollbar-hide flex h-full flex-col overflow-y-auto p-5">
          {/* User Profile / Auth Section */}
          <div className="mt-4 mb-8 flex items-start justify-between">
            {isLoggedIn ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 overflow-hidden rounded-full border border-gray-200">
                    <ProfileImage src={profileImage} alt={'프로필'} />
                  </div>
                  <div>
                    <span className="text-lg font-bold text-gray-800">
                      {myInfo?.userNickname} 님
                    </span>
                    <div className="text-sm text-gray-500">
                      {role === 'PRO' ? '전문가' : '일반 회원'}
                    </div>
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
            <button onClick={onClose} className="cursor-pointer text-gray-500 hover:text-black">
              {/* X Icon */}
              <XIcon className="h-8 w-8" />
            </button>
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
                    'text-xl font-bold transition-colors hover:text-black',
                    // If NOTHING is active, default to black. Otherwise follow strict active/inactive.
                    !isAnyActive || isActive ? 'text-black' : 'text-gray-400',
                  )
                }
                onClick={onClose}
              >
                {label}
              </NavLink>
            ))}

            {/* Category Toggle */}
            <div>
              <div
                className={clsx(
                  'flex cursor-pointer items-center justify-between text-xl font-bold transition-colors hover:text-black',
                  !isAnyActive || location.pathname.startsWith(ROUTES.CATEGORY.ROOT)
                    ? 'text-black'
                    : 'text-gray-400',
                )}
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                <span>카테고리</span>
                <XIcon
                  className={clsx(
                    'h-5 w-5 transition-transform duration-300',
                    isCategoryOpen ? 'rotate-90' : 'rotate-45',
                  )}
                />
              </div>

              {/* Category Sub-items */}
              <div
                className={clsx(
                  'overflow-hidden transition-all duration-300 ease-in-out',
                  isCategoryOpen ? 'mt-4 max-h-[500px] opacity-100' : 'max-h-0 opacity-0',
                )}
              >
                <div className="ml-1 flex flex-col gap-3 border-l-2 border-gray-100 pl-4">
                  {SPORTS.map((sport) => (
                    <NavLink
                      key={sport.id}
                      to={urlFor.categoryDetail(sport.slug)}
                      className="text-base font-medium text-gray-600 active:text-black"
                      onClick={onClose}
                    >
                      {sport.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          <hr className="my-6 border-gray-200" />

          {/* Extra Profile Links if Logged In */}
          {isLoggedIn && (
            <div className="flex flex-col gap-4">
              <div
                className="cursor-pointer text-base font-medium text-black"
                onClick={() => {
                  navigate(role === 'PRO' ? ROUTES.MYPAGE.PRO : ROUTES.MYPAGE.USER);
                  onClose();
                }}
              >
                내 정보
              </div>
              <div
                className="cursor-pointer text-base font-medium text-black"
                onClick={() => {
                  navigate(role === 'PRO' ? ROUTES.PRO_SETTLEMENT : ROUTES.USER_SETTLEMENT);
                  onClose();
                }}
              >
                {role === 'PRO' ? '정산 현황' : '결제 내역'}
              </div>
              <div
                className="cursor-pointer text-base font-medium text-red-500"
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
