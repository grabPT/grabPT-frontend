import { useQuery } from '@tanstack/react-query';

import { getContractInfo } from '@/features/Contract/apis/getContractInfo';
import type {
  getContractInfoResponseDto,
  getContractInfoResultType,
} from '@/features/Contract/types/getContractInfoType';

export const useGetContractInfo = (contractId: number) => {
  return useQuery<getContractInfoResponseDto, Error, getContractInfoResultType>({
    queryKey: ['contract', contractId],
    queryFn: () => getContractInfo(contractId),
    enabled: Boolean(contractId),
    select: (res) => res.result,
    staleTime: 0, // 5분 동안 fresh
    gcTime: 300_000, // 5 분 뒤 캐시 정리
    retry: 2, //2번까지 재시도
  });
};
