import { useQuery } from '@tanstack/react-query';

import { getSuggestDetail } from '@/features/SuggestDetail/apis/getSuggestDetail';
import type {
  getSuggestDetailResponseDto,
  suggestDetailType,
} from '@/features/SuggestDetail/types/getSuggestDetailType';

export const useGetSuggestDetail = (suggestionId: number) => {
  return useQuery<getSuggestDetailResponseDto, Error, suggestDetailType>({
    queryKey: ['suggest', suggestionId],
    queryFn: () => getSuggestDetail(suggestionId),
    enabled: Boolean(suggestionId),
    select: (res) => res.result,
    staleTime: 0, // 5분 동안 fresh
    gcTime: 300_000, // 5 분 뒤 캐시 정리
    retry: false, //2번까지 재시도
  });
};
