import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { getProposalsForRequest } from '@/features/ProposalsForRequest/apis/getProposalsForRequest';
import type {
  getProposalsForRequestRequestDto,
  getProposalsForRequestResponseDto,
  getProposalsForRequestResultType,
} from '@/features/ProposalsForRequest/types/getProposalsForRequestType';

export const useGetProposalsForRequest = (params: getProposalsForRequestRequestDto) => {
  const requestionId =
    typeof params.requestionId === 'number' &&
    Number.isFinite(params.requestionId) &&
    params.requestionId > 0
      ? params.requestionId
      : undefined;

  const enabled = requestionId !== undefined;

  return useQuery<getProposalsForRequestResponseDto, Error, getProposalsForRequestResultType>({
    queryKey: QUERY_KEYS.proposalsList(params),
    queryFn: () => getProposalsForRequest(params),
    enabled,
    select: (res) => res.result,
    staleTime: 100_000, // 1분 40초 동안 fresh
    gcTime: 300_000, // 5 분 뒤 캐시 정리
    retry: 2, //2번까지 재시도
  });
};
