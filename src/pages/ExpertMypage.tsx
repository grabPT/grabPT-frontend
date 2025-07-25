import { Outlet } from 'react-router-dom';

import Tabs from '@/components/Tabs';
import ROUTES from '@/constants/routes';

const ExpertMypage = () => {
  const tabs = [
    { label: '마이페이지', to: ROUTES.MYPAGE_EXPERT.ROOT },
    { label: '자기소개', to: ROUTES.MYPAGE_EXPERT.PROFILE },
    { label: '최근후기', to: ROUTES.MYPAGE_EXPERT.REVIEWS },
    { label: '자격사항 등록', to: ROUTES.MYPAGE_EXPERT.CREDENTIALS },
  ];

  return (
    <section className="py-[66px]">
      {/* 탭 */}
      <Tabs items={tabs} />
      <Outlet />
    </section>
  );
};

export default ExpertMypage;
