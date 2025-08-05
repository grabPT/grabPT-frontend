import { useQuery } from '@tanstack/react-query';

import { getRealtimeMatching } from '@/apis/getRealtimeMatching';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { getRealtimeMatchingResponseDto } from '@/types/RealtimeMatchingType';

export const useGetRealtimeMatching = (category: string) =>
  useQuery<getRealtimeMatchingResponseDto>({
    queryKey: [QUERY_KEYS.realtimeMatching(category), category], // category와 묶어서 캐시 키 고정
    queryFn: () => getRealtimeMatching(category), // 함수로 래핑
    enabled: Boolean(category), // category 준비됐을 때만
    staleTime: 30_000, // 30 초 동안 fresh
    gcTime: 300_000, // 5 분 뒤 캐시 정리
  });
