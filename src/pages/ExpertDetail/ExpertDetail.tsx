import { Outlet } from 'react-router-dom';

import Tabs from '@/components/Tabs';
import ROUTES from '@/constants/routes';

export const ExpertDetail = () => {
  const tabs = [
    { label: '정보', to: '' },
    { label: '후기', to: ROUTES.EXPERT_DETAIL.TABS.REVIEWS },
  ];
  return (
    <section className="my-[66px]">
      <div className="flex w-full flex-col items-center">
        <Tabs items={tabs} width="w-[400px]" />
        <Outlet />
      </div>
    </section>
  );
};
