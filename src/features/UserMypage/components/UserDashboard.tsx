import { useEffect, useState } from 'react';

import { type UserInfo } from '@/apis/getUserInfo';
import Dashboard from '@/components/Dashboard';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';

const ExpertDashboard = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const token = localStorage.getItem('accessToken') ?? undefined;
  const { data } = useGetUserInfo(token);
  useEffect(() => {
    if (data) setUserInfo(data);
  }, [data]);

  return (
    <div className="mt-[80px] flex justify-center">
      <Dashboard userInfo={userInfo} />
    </div>
  );
};

export default ExpertDashboard;
