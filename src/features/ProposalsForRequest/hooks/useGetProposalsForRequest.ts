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
    // ✅ queryKey를 안정적인 배열 형태로 변경
    queryKey: [QUERY_KEYS.proposalsList, JSON.stringify(params)],
    queryFn: () => getProposalsForRequest(params),
    enabled,
    select: (res) => res.result,
    staleTime: 100_000, // 1분 40초 동안 fresh
    gcTime: 300_000, // 5분 뒤 캐시 정리
    retry: 2, // 2번까지 재시도
  });
};
