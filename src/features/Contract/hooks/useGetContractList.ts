import { useQuery } from '@tanstack/react-query';
import type { getContractListRequestDto, getContractListResponseDto, getContractListResult,  } from '../types/getContractListType';
import { getContractList } from '../apis/getContractList';
import { QUERY_KEYS } from '@/constants/queryKeys';


export const useGetContractList = (params:getContractListRequestDto) => {
  return useQuery<getContractListResponseDto, Error, getContractListResult>({
    queryKey: QUERY_KEYS.contractList(params),
    queryFn: () => getContractList(params),
    enabled: Boolean(params),
    select: (res) => res.result,
    staleTime: 0, // 5분 동안 fresh
    gcTime: 300_000, // 5 분 뒤 캐시 정리
    retry: 2, //2번까지 재시도
  });
};
