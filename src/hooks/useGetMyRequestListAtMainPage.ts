import { useQuery } from '@tanstack/react-query';

import { getMyRequestsListAtMainPage } from '@/apis/getMyRequestListAtMainPage';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { getMyInfoListRequestDto } from '@/features/Mypage/types/getMyRequestsListRequestDto';
import type {
  getMyRequestsListResponseDto,
  getMyRequestsListResultType,
} from '@/types/getMyRequestListResponse';

export const useGetMyRequestsListAtMainPage = (params: getMyInfoListRequestDto, enabled: boolean) =>
  useQuery<getMyRequestsListResponseDto, Error, getMyRequestsListResultType>({
    queryKey: QUERY_KEYS.myRequestsList(params),
    queryFn: () => getMyRequestsListAtMainPage(params),
    enabled,
    select: (res) => res.result,
    staleTime: 5_000,
    gcTime: 300_000,
    retry: 2,
  });
