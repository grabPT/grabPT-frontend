import { useQuery } from '@tanstack/react-query';

import { getMyRequestsList } from '@/apis/getMyRequestList';
import { QUERY_KEYS } from '@/constants/queryKeys';

import type {
  getMyRequestsListResponseDto,
  getMyRequestsListResultType,
} from '@/types/getMyRequestListResponse';
import type { getMyInfoListRequestDto } from '@/features/Mypage/types/getMyRequestsListRequestDto';

export const useGetMyRequestsList = (params: getMyInfoListRequestDto) =>
  useQuery<getMyRequestsListResponseDto, Error, getMyRequestsListResultType>({
    queryKey: QUERY_KEYS.myRequestsList(params),
    queryFn: () => getMyRequestsList(params),
    enabled: Boolean(params),
    select: (res) => res.result,
    staleTime: 5_000, 
    gcTime: 300_000, 
    retry: 2, 
  });
