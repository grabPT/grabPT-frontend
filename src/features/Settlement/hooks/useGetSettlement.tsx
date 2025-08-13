import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { getSettlementList } from '@/features/Settlement/apis/settlement';
import type {
  getSettlementListResponse,
  getSettlementListResult,
} from '@/features/Settlement/types/settlement';

export const useGetSettlementList = (page: number) =>
  useQuery<getSettlementListResponse, Error, getSettlementListResult>({
    queryKey: QUERY_KEYS.settlementList(page),
    queryFn: () => getSettlementList(page),
    select: (res) => res.result,
    staleTime: 5_000, // 5 초 동안 fresh = 실시간이라서
    gcTime: 300_000, // 5 분 뒤 캐시 정리
    retry: 2, //2번까지 재시도
  });
