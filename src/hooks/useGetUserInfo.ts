import { useQuery } from '@tanstack/react-query';

import { type UserInfo, getUserInfo } from '@/apis/getUserInfo';

export function useGetUserInfo() {
  return useQuery<UserInfo>({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const data = await getUserInfo();
      return data.result;
    },
    // todo: 비로그인시 enabled
    enabled: true,
    staleTime: 1000 * 60 * 5,
  });
}
