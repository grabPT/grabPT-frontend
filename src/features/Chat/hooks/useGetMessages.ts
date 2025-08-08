// src/features/Chat/hooks/useGetMessagesInfinite.ts
import { useInfiniteQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { getMessages } from '@/features/Chat/apis/getMessages';
import type {
  getMessagesRequestDto,
  getMessagesResponseDto,
  getMessagesResultType,
} from '@/features/Chat/types/getMessagesType';

/**
 * roomId 기반 메시지 무한스크롤 훅
 * - initialPageParam: 0
 * - getNextPageParam: 서버가 준 result.cursor 사용 (없으면 끝)
 * - select: pages를 result로 치환해서 꺼내쓰기 편하게 가공
 */
export const useGetMessagesInfinite = (paramsBase: Omit<getMessagesRequestDto, 'cursor'>) => {
  const enabled = Boolean(paramsBase && (paramsBase as any).roomId);

  return useInfiniteQuery<
    getMessagesResponseDto, // raw 서버 응답 타입
    Error, // 에러
    { pages: getMessagesResultType[]; pageParams: unknown[] } // select 후 노출 타입
  >({
    queryKey: QUERY_KEYS.CHAT.messages?.(paramsBase) ?? [
      'chat',
      'messages',
      'infinite',
      paramsBase,
    ], // 키 빌더 없으면 fallback
    queryFn: ({ pageParam = 0 }) =>
      getMessages({ ...paramsBase, cursor: pageParam } as getMessagesRequestDto),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextCursor = lastPage?.result?.cursor;
      return nextCursor ?? undefined; // 없으면 더 불러오지 않음
    },
    select: (data) => ({
      pages: data.pages.map((p) => p.result), // result만 꺼내서 깔끔하게
      pageParams: data.pageParams,
    }),
    enabled,
    staleTime: 300_000, // 5분
    gcTime: 300_000, // 5분
    retry: 2,
  });
};
