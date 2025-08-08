import { useQuery } from '@tanstack/react-query';

import { getProProfile } from '@/apis/getProProfile';
import type { getProPrifleResponseDto } from '@/types/ProPrifleType';

export const useProProfileQuery = (userId: number) => {
  return useQuery<getProPrifleResponseDto>({
    queryKey: ['pro-profile', userId],
    queryFn: () => getProProfile(userId),
    enabled: !!userId, // userId 있을 때만 허용
  });
};
