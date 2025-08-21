import { useQuery } from '@tanstack/react-query';

import { getAvgPrice } from '@/apis/getAvgPrice';

export const useGetAvgPrice = (
  categoryName: string,
  city: string,
  district: string,
  street: string,
) => {
  return useQuery({
    queryKey: ['avgPrice', categoryName, city, district, street],
    queryFn: () => getAvgPrice(categoryName, city, district, street),
    enabled: !!categoryName && !!city && !!district && !!street, // 값이 있을 때만 실행
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱
    retry: 1, // 실패시 1번만 재시도
  });
};
