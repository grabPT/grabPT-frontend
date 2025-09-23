import { useQuery } from '@tanstack/react-query';

import { getCategoryPros } from '@/apis/getCategoryPros';
import type { getCategoryProsInfoDto } from '@/types/CategoryProsType';

type Pros = getCategoryProsInfoDto['result'];

export function useGetCategoryPros(categoryCode?: string | null, region?: string | null) {
  return useQuery<Pros>({
    queryKey: ['categoryPros', categoryCode, region],
    queryFn: async () => {
      if (!categoryCode || !region) throw new Error('params missing');
      const data = await getCategoryPros(categoryCode, region);
      return data.result;
    },
    enabled: !!categoryCode && !!region, // 둘 다 있을 때만 호출
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 20, // 20분 (React Query v5)
    retry: 1,
    placeholderData: (prev) => prev, // 페이지 전환시 이전 데이터 유지
  });
}
