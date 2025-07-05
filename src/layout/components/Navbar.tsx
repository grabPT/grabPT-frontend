import { Link } from 'react-router-dom';

function Navbar() {
  // 라우팅 완료 시 자료구조 변경
  const menuList = ['요청서 작성', '트레이너 찾기', '내지역 센터', '카테고리'];

  return (
    <div className="absolute left-1/2 flex h-full -translate-x-1/2 gap-[68px] max-[1440px]:gap-[20px]">
      {menuList.map((menu) => (
        <div className="flex h-full w-[126px] items-center justify-center" key={menu}>
          <Link to={'/'} className="text-[18px] font-extrabold text-black">
            {menu}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Navbar;
