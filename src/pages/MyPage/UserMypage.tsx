import { Outlet } from 'react-router-dom';

import Tabs from '@/components/Tabs';
import ROUTES from '@/constants/routes';

const UserMypage = () => {
  const tabs = [
    { label: '마이페이지', to: ROUTES.MYPAGE.USER_TABS.DASHBOARD },
    { label: '요청서 작성 내역', to: ROUTES.MYPAGE.USER_TABS.REQUESTS },
    { label: '리뷰 관리', to: ROUTES.MYPAGE.USER_TABS.REVIEWS },
    // { label: '개인 설정', to: ROUTES.MYPAGE.USER_TABS.SETTINGS },
  ];

  return (
    <section className="py-[66px]">
      <div className="flex w-full flex-col items-center">
        <Tabs items={tabs} />
        <Outlet />
      </div>
    </section>
  );
};

export default UserMypage;
