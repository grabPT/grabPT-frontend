import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { getReviewsByUserId } from '@/features/ProDetail/apis/getReveiwsByUserId';
import type { getProReviewsRequestByUserId } from '@/features/ProDetail/types/getReviewsByUserId';

export const useGetReviewsByUserId = (params: getProReviewsRequestByUserId) =>
  useQuery({
    queryKey: QUERY_KEYS.proReviewsByUserId(params),
    queryFn: () => getReviewsByUserId(params),
    select: (res) => res.result,
    staleTime: 5_000,
    gcTime: 300_000,
    retry: 2,
  });
