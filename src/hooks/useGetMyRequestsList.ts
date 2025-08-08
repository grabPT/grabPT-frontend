import { useQuery } from '@tanstack/react-query';

import { getMyRequestsList } from '@/apis/getMyRequestList';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { getMyRequestsListRequestDto } from '@/features/Mypage/types/getMyRequestsListRequestDto';
import type {
  getMyRequestsListResponseDto,
  getMyRequestsListResultType,
} from '@/types/getMyRequestListResponse';

export const useGetMyRequestsList = (params: getMyRequestsListRequestDto) =>
  useQuery<getMyRequestsListResponseDto, Error, getMyRequestsListResultType>({
    queryKey: QUERY_KEYS.myRequestsList(params),
    queryFn: () => getMyRequestsList(params),
    enabled: Boolean(params),
    select: (res) => res.result,
    staleTime: 5_000, // 5 초 동안 fresh = 실시간이라서
    gcTime: 300_000, // 5 분 뒤 캐시 정리
    retry: 2, //2번까지 재시도
  });
