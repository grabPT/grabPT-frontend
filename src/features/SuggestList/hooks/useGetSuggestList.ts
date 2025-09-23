import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { getSuggestList } from '@/features/SuggestList/apis/getSuggestList';
import type {
  getSuggestListRequestDto,
  getSuggestListResponseDto,
  getSuggestListResulttype,
} from '@/features/SuggestList/types/getSuggestListType';

export const useGetSuggestList = (params: getSuggestListRequestDto) =>
  useQuery<getSuggestListResponseDto, Error, getSuggestListResulttype>({
    queryKey: QUERY_KEYS.suggestList(params),
    queryFn: () => getSuggestList(params),
    enabled: Boolean(params),
    select: (res) => res.result,
    staleTime: 100_000, // 1분 동안 fresh
    gcTime: 300_000, // 5 분 뒤 캐시 정리
    retry: 2, //2번까지 재시도
  });
