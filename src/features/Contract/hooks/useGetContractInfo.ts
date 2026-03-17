import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { getContractInfo } from '@/features/Contract/apis/getContractInfo';
import type {
  getContractInfoResponseDto,
  getContractInfoResultType,
} from '@/features/Contract/types/getContractInfoType';

export const useGetContractInfo = (contractId: number) => {
  return useQuery<getContractInfoResponseDto, Error, getContractInfoResultType>({
    queryKey: QUERY_KEYS.CONTRACT.detail(contractId),
    queryFn: () => getContractInfo(contractId),
    enabled: Boolean(contractId),
    select: (res) => res.result,
    staleTime: 0,
    gcTime: 300_000,
    retry: 2, //2번까지 재시도
  });
};
