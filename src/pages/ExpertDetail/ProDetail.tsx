import { Outlet } from 'react-router-dom';

import Tabs from '@/components/Tabs';
import ROUTES from '@/constants/routes';

export const ProDetail = () => {
  const tabs = [
    { label: '정보', to: '' },
    { label: '후기', to: ROUTES.PRO_DETAIL.TABS.REVIEW_LIST },
  ];
  return (
    <section className="my-[66px]">
      <div className="flex w-full flex-col items-center">
        <Tabs items={tabs} width="w-[300px]" />
        <Outlet />
      </div>
    </section>
  );
};
