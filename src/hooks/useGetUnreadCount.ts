import { useQuery } from '@tanstack/react-query';

import { getUnreadCount, type getUnreadCountResponseDto } from '@/apis/getUnreadCount';
import { QUERY_KEYS } from '@/constants/queryKeys';

export const useGetUnreadCount = () => {
  return useQuery<getUnreadCountResponseDto, Error, number>({
    queryKey: QUERY_KEYS.unreadCount,
    queryFn: () => getUnreadCount(),
    enabled: true,
    select: (res) => res.result,
    staleTime: 60_000, // 1분 동안 fresh
    gcTime: 300_000, // 5 분 뒤 캐시 정리
    retry: 2, //2번까지 재시도
  });
};
