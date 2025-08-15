import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { getExpertReviews } from '@/features/ExpertMypage/apis/getExpertReviews';
import type { getExpertReviewsRequest } from '@/features/ExpertMypage/types/getExpertReviews';

export const useGetExpertReviews = (params: getExpertReviewsRequest) =>
  useQuery({
    queryKey: QUERY_KEYS.expertReviews(params),
    queryFn: () => getExpertReviews(params),
    enabled: Boolean(params),
    select: (res) => res.result,
    staleTime: 100_000, // 1분 동안 fresh
    gcTime: 300_000, // 5 분 뒤 캐시 정리
    retry: 2, //2번까지 재시도
  });
