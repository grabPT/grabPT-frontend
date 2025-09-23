import { Outlet } from 'react-router-dom';

import Tabs from '@/components/Tabs';
import ROUTES from '@/constants/routes';

const tabs = [
  { label: '요청 현황', to: ROUTES.MATCHING_STATUS.REQUESTS.ROOT },
  { label: '제안 현황', to: ROUTES.MATCHING_STATUS.SUGGESTS.ROOT },
];

const MatchingStatusPage = () => {
  return (
    <div className="pt-12">
      <div className="">
        <Tabs items={tabs} width="w-72" />
      </div>
      <Outlet />
    </div>
  );
};

export default MatchingStatusPage;
