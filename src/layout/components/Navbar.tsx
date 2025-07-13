import { Link } from 'react-router-dom';
import ROUTES from '@/constants/routes';

function Navbar() {
  const menuList = [
    { label: '요청서 작성', path: '/' },
    { label: '트레이너 찾기', path: '/' },
    { label: '내지역 센터', path: '/' },
    { label: '카테고리', path: ROUTES.CATEGORY }, 
  ];

  return (
    <div className="absolute left-1/2 top-0 flex h-[80px] -translate-x-1/2 gap-[68px] max-[1440px]:gap-[20px] z-50">
      {menuList.map((menu) => (
        <div className="flex h-full w-[126px] items-center justify-center" key={menu.label}>
          <Link to={menu.path} className="text-[18px] font-extrabold text-black">
            {menu.label}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Navbar;
