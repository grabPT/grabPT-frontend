import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { getProposalsList } from '@/features/Proposals/apis/getProposalsList';
import type {
  getProposalsListRequestDto,
  getProposalsListResponseDto,
  getProposalsListResulttype,
} from '@/features/Proposals/types/getProposalsListType';

export const useGetProposalsList = (params: getProposalsListRequestDto) =>
  useQuery<getProposalsListResponseDto, Error, getProposalsListResulttype>({
    queryKey: QUERY_KEYS.proposalsList(params),
    queryFn: () => getProposalsList(params),
    enabled: Boolean(params),
    select: (res) => res.result,
    staleTime: 100_000, // 1분 동안 fresh
    gcTime: 300_000, // 5 분 뒤 캐시 정리
    retry: 2, //2번까지 재시도
  });
