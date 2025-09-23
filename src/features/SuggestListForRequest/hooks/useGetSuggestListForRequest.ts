import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { getSuggestListForRequest } from '@/features/SuggestListForRequest/apis/getSuggestListForRequest';
import type {
  getSuggestListForRequestRequestDto,
  getSuggestListForRequestResponseDto,
  getSuggestListForRequestResultType,
} from '@/features/SuggestListForRequest/types/getSuggestListForRequestType';

export const useGetSuggestListForRequest = (params: getSuggestListForRequestRequestDto) => {
  const requestionId =
    typeof params.requestionId === 'number' &&
    Number.isFinite(params.requestionId) &&
    params.requestionId > 0
      ? params.requestionId
      : undefined;

  const enabled = requestionId !== undefined;

  return useQuery<getSuggestListForRequestResponseDto, Error, getSuggestListForRequestResultType>({
    // ✅ queryKey를 안정적인 배열 형태로 변경
    queryKey: [QUERY_KEYS.suggestList, JSON.stringify(params)],
    queryFn: () => getSuggestListForRequest(params),
    enabled,
    select: (res) => res.result,
    staleTime: 100_000, // 1분 40초 동안 fresh
    gcTime: 300_000, // 5분 뒤 캐시 정리
    retry: 2, // 2번까지 재시도
  });
};
