// src/hooks/useGetUserInfo.ts
import { useQuery } from '@tanstack/react-query';

import { type UserInfo, getLocation } from '@/apis/getUserInfo';

export function useGetUserInfo(accessToken?: string) {
  return useQuery<UserInfo>({
    queryKey: ['userInfo', accessToken],
    queryFn: async () => {
      if (!accessToken) throw new Error('Access token is missing');
      const data = await getLocation(accessToken);
      return data.result;
    },
    enabled: !!accessToken, // 토큰이 있을 때만 요청
    staleTime: 1000 * 60 * 5,
  });
}
