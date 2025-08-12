import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/queryKeys';
import {
  getMatcingRequestsList,
  getRequestsList,
} from '@/features/Requests/apis/getMyRequestsList';
import type {
  getRequestsListRequestDto,
  getRequestsListResponseDto,
  getRequestsListResultType,
} from '@/features/Requests/types/getRequestsListType';

export const useGetRequestsList = (params: getRequestsListRequestDto) =>
  useQuery<getRequestsListResponseDto, Error, getRequestsListResultType>({
    queryKey: QUERY_KEYS.requestsList(params),
    queryFn: () => getRequestsList(params),
    enabled: Boolean(params),
    select: (res) => res.result,
    staleTime: 5_000, // 5 초 동안 fresh = 실시간이라서
    gcTime: 300_000, // 5 분 뒤 캐시 정리
    retry: 2, //2번까지 재시도
  });

//트레이너에게 온 요청 현황
export const useGetMatchingRequestsList = (params: getRequestsListRequestDto) =>
  useQuery<getRequestsListResponseDto, Error, getRequestsListResultType>({
    queryKey: QUERY_KEYS.matcingRequestsList(params),
    queryFn: () => getMatcingRequestsList(params),
    enabled: Boolean(params),
    select: (res) => res.result,
    staleTime: 5_000, // 5 초 동안 fresh = 실시간이라서
    gcTime: 300_000, // 5 분 뒤 캐시 정리
    retry: 2, //2번까지 재시도
  });
