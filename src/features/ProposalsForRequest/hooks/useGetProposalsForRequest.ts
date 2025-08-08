import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { getProposalsForRequest } from '@/features/ProposalsForRequest/apis/getProposalsForRequest';
import type {
  getProposalsForRequestRequestDto,
  getProposalsForRequestResponseDto,
  getProposalsForRequestResultType,
} from '@/features/ProposalsForRequest/types/getProposalsForRequestType';

export const useGetProposalsList = (params: getProposalsForRequestRequestDto) =>
  useQuery<getProposalsForRequestResponseDto, Error, getProposalsForRequestResultType>({
    queryKey: QUERY_KEYS.proposalsList(params),
    queryFn: () => getProposalsForRequest(params),
    enabled: Boolean(params),
    select: (res) => res.result,
    staleTime: 100_000, // 1분 동안 fresh
    gcTime: 300_000, // 5 분 뒤 캐시 정리
    retry: 2, //2번까지 재시도
  });
