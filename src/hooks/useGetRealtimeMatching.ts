import { useQuery } from '@tanstack/react-query';

import { getRealtimeMatching } from '@/apis/getRealtimeMatching';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type {
  RealtimeMatchingType,
  getRealtimeMatchingResponseDto,
} from '@/types/RealtimeMatchingType';
import type { SportsSlugType } from '@/types/SportsType';

// useQuery<
//   TQueryFnData,   // ① queryFn이 반환하는 원본 데이터
//   TError,         // ② 에러 객체 타입
//   TData,          // ③ select 등으로 가공된 최종 데이터
//   TQueryKey       // ④ queryKey 타입(대부분 생략)
// >(options)
export const useGetRealtimeMatching = (category: SportsSlugType) =>
  useQuery<getRealtimeMatchingResponseDto, Error, RealtimeMatchingType[]>({
    queryKey: QUERY_KEYS.realtimeMatching(category), // category와 묶어서 캐시 키 고정
    queryFn: () => getRealtimeMatching(category), // 함수로 래핑 (파라미터 있어서)
    enabled: Boolean(category), // category 준비됐을 때만
    select: (res) => res.result, //response data중 result만 반환하도록
    staleTime: 5_000, // 5 초 동안 fresh = 실시간이라서
    gcTime: 300_000, // 5 분 뒤 캐시 정리
    retry: 2, //2번까지 재시도
  });
