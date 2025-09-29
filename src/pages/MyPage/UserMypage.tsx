import { Outlet } from 'react-router-dom';

import Tabs from '@/components/Tabs';
import ROUTES from '@/constants/routes';

const UserMypage = () => {
  const tabs = [
    { label: '마이페이지', to: ROUTES.MYPAGE.USER_TABS.DASHBOARD },
    { label: '요청서 작성 내역', to: ROUTES.MYPAGE.USER_TABS.REQUEST_LIST },
    { label: '리뷰 관리', to: ROUTES.MYPAGE.USER_TABS.REVIEW_LIST },
    // { label: '개인 설정', to: ROUTES.MYPAGE.USER_TABS.SETTINGS },
  ];

  return (
    <section className="py-[66px]">
      <div className="flex w-full flex-col items-center">
        <Tabs items={tabs} width="w-[200px]" />
        <Outlet />
      </div>
    </section>
  );
};

export default UserMypage;
