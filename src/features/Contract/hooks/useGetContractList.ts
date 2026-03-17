import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/queryKeys';

import { getContractList } from '../apis/getContractList';
import type {
  getContractListRequestDto,
  getContractListResponseDto,
  getContractListResult,
} from '../types/getContractListType';

export const useGetContractList = (params: getContractListRequestDto) => {
  return useQuery<getContractListResponseDto, Error, getContractListResult>({
    queryKey: QUERY_KEYS.CONTRACT.list(params),
    queryFn: () => getContractList(params),
    enabled: params.role !== null && params.userId !== null,
    select: (res) => res.result,
    staleTime: 0,
    gcTime: 300_000, // 5 분 뒤 캐시 정리
    retry: 2, //2번까지 재시도
  });
};
