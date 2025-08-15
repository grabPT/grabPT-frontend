import { useQuery } from '@tanstack/react-query';

import { getProposalDetail } from '@/features/ProposalDetail/apis/getProposalDetail';
import type {
  getProposalDetailResponseDto,
  proposalDetailType,
} from '@/features/ProposalDetail/types/getProposalDetailType';

export const useGetProposalDetail = (suggestionId: number) => {
  return useQuery<getProposalDetailResponseDto, Error, proposalDetailType>({
    queryKey: ['proposal', suggestionId],
    queryFn: () => getProposalDetail(suggestionId),
    enabled: Boolean(suggestionId),
    select: (res) => res.result,
    staleTime: 0, // 5분 동안 fresh
    gcTime: 300_000, // 5 분 뒤 캐시 정리
    retry: 2, //2번까지 재시도
  });
};
