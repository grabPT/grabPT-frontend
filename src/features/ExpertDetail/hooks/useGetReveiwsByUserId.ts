import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { getReviewsByUserId } from '@/features/ExpertDetail/apis/getReveiwsByUserId';
import type { getExpertReviewsRequestByUserId } from '@/features/ExpertDetail/types/getReviewsByUserId';

export const useGetReviewsByUserId = (params: getExpertReviewsRequestByUserId) =>
  useQuery({
    queryKey: QUERY_KEYS.expertReviewsByUserId(params),
    queryFn: () => getReviewsByUserId(params),
    select: (res) => res.result,
    staleTime: 5_000,
    gcTime: 300_000,
    retry: 2,
  });
