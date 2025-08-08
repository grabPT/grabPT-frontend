import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/queryKeys';
import type { getMyInfoListRequestDto } from '@/features/Mypage/types/getMyRequestsListRequestDto';
import { getMyReviewsList } from '@/features/Requests/apis/getMyReviewsList';
import type {
  getMyReviewsListResponseDto,
  getMyReviewsListResultType,
} from '@/features/Requests/types/getReviewsListType';

export const useGetMyReviewsList = (params: getMyInfoListRequestDto) =>
  useQuery<getMyReviewsListResponseDto, Error, getMyReviewsListResultType>({
    queryKey: QUERY_KEYS.myReviewsList(params),
    queryFn: () => getMyReviewsList(params),
    enabled: Boolean(params),
    select: (res) => res.result,
    staleTime: 5_000,
    gcTime: 300_000,
    retry: 2,
  });
