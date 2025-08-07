import type { getProposalsListRequestDto } from '@/features/Proposals/types/getProposalsListType';
import type { getRequestsListRequestDto } from '@/features/Requests/types/getRequestsListType';

export const QUERY_KEYS = {
  realtimeMatching: (category: string) => ['realtimeMatching', category] as const,
  requestsList: (params: getRequestsListRequestDto) => [
    'reqeustsList',
    params.sortBy,
    params.page,
    params.size,
  ],
  proposalsList: (params: getProposalsListRequestDto) => ['proposalsList', params.page],
  // …다른 키들
};
