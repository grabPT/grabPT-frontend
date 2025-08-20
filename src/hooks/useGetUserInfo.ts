// src/hooks/useGetUserInfo.ts
import { useQuery } from '@tanstack/react-query';

import { type UserInfo, getUserInfo } from '@/apis/getUserInfo';
import { useRoleStore } from '@/store/useRoleStore';

export function useGetUserInfo() {
  const { role } = useRoleStore();
  return useQuery<UserInfo>({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const data = await getUserInfo();
      return data.result;
    },
    enabled: role === 'USER',
    staleTime: 1000 * 60 * 5,
  });
}
