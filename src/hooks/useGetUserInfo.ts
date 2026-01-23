import { useQuery } from '@tanstack/react-query';

import { type UserInfo, getUserInfo } from '@/apis/getUserInfo';

export function useGetUserInfo(enabled: boolean = true) {
  return useQuery<UserInfo>({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const data = await getUserInfo();
      return data.result;
    },
    enabled,
    staleTime: 1000 * 60 * 5,
  });
}
