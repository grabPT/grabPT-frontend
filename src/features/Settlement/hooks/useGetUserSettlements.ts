import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { getUserSettlements } from '@/features/Settlement/apis/getUserSettlements';
import type {
  getUserSettlementsRequestDto,
  getUserSettlementsResponseDto,
  getUserSettlementsResultType,
} from '@/features/Settlement/types/getUserSettlementsType';

export const useGetUserSettlements = (params: getUserSettlementsRequestDto) =>
  useQuery<getUserSettlementsResponseDto, Error, getUserSettlementsResultType>({
    queryKey: QUERY_KEYS.settlementList(params.page),
    queryFn: () => getUserSettlements({ page: params.page }),
    select: (res) => res.result,
    staleTime: 5_000, // 5 초 동안 fresh = 실시간이라서
    gcTime: 300_000, // 5 분 뒤 캐시 정리
    retry: 2, //2번까지 재시도
  });
