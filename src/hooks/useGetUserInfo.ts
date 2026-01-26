import { useQuery } from '@tanstack/react-query';

import { type UserInfo, getUserInfo } from '@/apis/getUserInfo';
import { useRoleStore } from '@/store/useRoleStore';

export function useGetUserInfo(enabled: boolean = true) {
  const isLoggedIn = useRoleStore.getState().isLoggedIn;

  return useQuery<UserInfo>({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const data = await getUserInfo();
      return data.result;
    },
    enabled: isLoggedIn && enabled,
    staleTime: 1000 * 60 * 5,
  });
}
