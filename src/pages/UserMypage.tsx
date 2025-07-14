import { Outlet } from 'react-router-dom';

import Tabs from '@/components/Tabs';

const UserMypage = () => {
  const tabs = [
    { label: '마이페이지', to: '/mypage/user' },
    { label: '요청서 작성 내역', to: '/mypage/user/requests' },
    { label: '리뷰 관리', to: '/mypage/user/reviews' },
    { label: '개인 설정', to: '/mypage/user/settings' },
  ];

  return (
    <section className="my-[66px]">
      <div className="flex w-full flex-col items-center">
        <Tabs items={tabs} />
        <Outlet />
      </div>
    </section>
  );
};

export default UserMypage;
