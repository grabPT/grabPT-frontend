import { useState } from 'react';

import clsx from 'clsx';
import { NavLink, useLocation } from 'react-router-dom';

import ROUTES from '@/constants/routes';
import CategoryDropdown from '@/layout/components/CategoryDropdown';
import { useRoleStore } from '@/store/useRoleStore';

const Navbar = () => {
  const { role } = useRoleStore();

  const location = useLocation();
  const [isOpenCategoryDropdown, setIsOpenCategoryDropdown] = useState<boolean>(false);

  // 페이지 생성 시 path 수정, memo도입 고려
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

  /* 현재 주소가 메뉴 중 하나와 일치하는지 */
  const hasActive = menuList.some(({ path }) => path === location.pathname);

  return (
    <nav className="z-50 hidden max-w-2xl flex-1 grid-cols-4 items-center md:grid">
      {menuList.map(({ label, path }) => {
        const isCategory = label === '카테고리';
        const isActive = location.pathname === path;

        return (
          <div
            key={label}
            className="relative flex h-[70px] w-full items-center justify-center"
            onMouseLeave={() => isCategory && setIsOpenCategoryDropdown(false)}
          >
            <NavLink
              onMouseEnter={() => isCategory && setIsOpenCategoryDropdown(true)}
              to={path}
              end={path === '/'}
              className={clsx(
                'relative flex items-center justify-center text-base font-extrabold transition-colors',
                'after:absolute after:top-full after:left-1/2 after:mt-1 after:-translate-x-1/2',
                'after:h-0.5 after:w-0 after:bg-current after:transition-[width] after:duration-300 after:content-[""]',
                'hover:after:w-[120%]',
                isActive ? 'text-black' : hasActive && 'text-[#A7A7A7] hover:text-black',
              )}
            >
              {label}
            </NavLink>

            {/* 드롭다운을 해당 메뉴 아래에 가운데 정렬로 붙임 */}
            {isCategory && isOpenCategoryDropdown && (
              <div className="absolute top-full left-1/2 z-10 -translate-x-1/2">
                <CategoryDropdown />
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Navbar;
