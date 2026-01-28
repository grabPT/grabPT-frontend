import { useEffect, useState } from 'react';

import { type UserInfo } from '@/apis/getUserInfo';
import Dashboard from '@/components/Dashboard';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import { useRoleStore } from '@/store/useRoleStore';

const ProDashboard = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const { setProfileImage } = useRoleStore();
  const { data } = useGetUserInfo();
  useEffect(() => {
    if (data) {
      setUserInfo(data);
      setProfileImage(data.profileImageUrl ?? null);
    }
  }, [data, setProfileImage]);

  return (
    <div className="mt-[80px] flex justify-center">
      <Dashboard userInfo={userInfo} />
    </div>
  );
};

export default ProDashboard;
