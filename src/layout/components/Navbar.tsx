import { Link } from 'react-router-dom';

import ROUTES from '@/constants/routes';
import { useUserRoleStore } from '@/store/useUserRoleStore';

function Navbar() {
  const { isExpert } = useUserRoleStore();

  const menuList = [
    /** 전문가라면 요청 현황 */
    { label: isExpert ? '요청 현황' : '요청서 작성', path: '/' },
    { label: '트레이너 찾기', path: '/' },
    { label: '내지역 센터', path: '/' },
    { label: '카테고리', path: ROUTES.CATEGORY.ROOT },
  ];

  return (
    <nav className="absolute top-0 left-1/2 z-50 flex h-full -translate-x-1/2 items-center gap-[68px] max-[1440px]:gap-[20px]">
      {menuList.map(({ label, path }) => (
        <Link
          key={label}
          to={path}
          className="flex h-full w-[126px] items-center justify-center text-[18px] font-extrabold text-black"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}

export default Navbar;
