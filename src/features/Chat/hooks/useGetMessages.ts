import { useInfiniteQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { getMessages } from '@/features/Chat/apis/getMessages';
import type {
  getMessagesRequestDto,
  getMessagesResponseDto,
  getMessagesResultType,
} from '@/features/Chat/types/getMessagesType';

type Exposed = {
  pages: getMessagesResultType[];
  pageParams: unknown[];
};

export const useGetMessagesInfinite = (params: getMessagesRequestDto) => {
  const roomId = params.roomId;

  return useInfiniteQuery<getMessagesResponseDto, Error, Exposed>({
    queryKey: QUERY_KEYS.CHAT.messages(params),

    // 첫 호출은 cursor 미포함
    initialPageParam: undefined,
    queryFn: ({ pageParam }) => {
      const hasCursor = pageParam !== undefined && pageParam !== null;
      const q: getMessagesRequestDto = hasCursor
        ? { roomId: params.roomId, cursor: pageParam as number }
        : { roomId: params.roomId };
      return getMessages(q);
    },

    // 서버 커서 그대로 사용 (없으면 stop)
    getNextPageParam: (lastPage) => lastPage?.result?.cursor ?? undefined,

    // 응답 모양 고정: data.result + data.pages
    select: (data) => ({
      result: data.pages[0].result,
      pages: data.pages.map((p) => p.result),
      pageParams: data.pageParams,
    }),

    enabled: Boolean(roomId),
    // staleTime: 0,
    // gcTime: 300_000,
    retry: 2,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};
