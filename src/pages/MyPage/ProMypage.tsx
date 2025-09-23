import { Outlet } from 'react-router-dom';

import Tabs from '@/components/Tabs';
import ROUTES from '@/constants/routes';

const ProMypage = () => {
  const tabs = [
    { label: '마이페이지', to: ROUTES.MYPAGE.PRO },
    { label: '자기소개', to: ROUTES.MYPAGE.PRO_TABS.PROFILE },
    { label: '최근후기', to: ROUTES.MYPAGE.PRO_TABS.REVIEW_LIST },
    { label: '자격사항 등록', to: ROUTES.MYPAGE.PRO_TABS.CERTIFICATIONS },
  ];

  return (
    <section className="py-[66px]">
      {/* 탭 */}
      <Tabs items={tabs} />
      <Outlet />
    </section>
  );
};

export default ProMypage;
