import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { getProReviews } from '@/features/ProMypage/apis/getProReviews';
import type { getProReviewsRequest } from '@/features/ProMypage/types/getProReviews';

export const useGetProReviews = (params: getProReviewsRequest) =>
  useQuery({
    queryKey: QUERY_KEYS.proReviews(params),
    queryFn: () => getProReviews(params),
    enabled: Boolean(params),
    select: (res) => res.result,
    staleTime: 100_000, // 1분 동안 fresh
    gcTime: 300_000, // 5 분 뒤 캐시 정리
    retry: 2, //2번까지 재시도
  });
