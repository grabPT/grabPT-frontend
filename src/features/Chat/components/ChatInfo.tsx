import { useEffect, useMemo, useRef, useState } from 'react';

import { ChatText } from '@/features/Chat/components/ChatText';
import { useGetMessagesInfinite } from '@/features/Chat/hooks/useGetMessages';
import { onErrorImage } from '@/utils/onErrorImage';

interface ChatInfoProps {
  roomId: number;
  name: string;
  img: string;
}

export const ChatInfo = ({ roomId, name, img }: ChatInfoProps) => {
  const { data, fetchNextPage, isFetchingNextPage, isLoading } = useGetMessagesInfinite({ roomId });
  console.log(data);

  // 스크롤 컨테이너 & 상단/하단 앵커
  const scrollRef = useRef<HTMLDivElement>(null);
  const topSentinelRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // 같은 커서 중복 요청 방지
  const lastRequestedCursorRef = useRef<number | null>(null);

  // 첫 진입 자동 스크롤 중복 방지
  const [didInitialScroll, setDidInitialScroll] = useState(false);

  // ✅ 서버가 준 페이지 순서를 그대로 이어붙임 (정렬/디듀프 X)
  //    TanStack의 pages는 [첫 페이지, 그다음, ...] 순서로 누적됨
  // ✅ 모든 로드된 페이지를 '순서대로' 이어붙임 (정렬/디듀프 X)
  const messages = useMemo(() => {
    const pages = data?.pages ?? [];
    if (!pages.length) return [];

    // 각 페이지 내부가 DESC(최신→오래된)라면 뒤집어 ASC로
    const pagesAscInside = pages.map((p) => {
      const arr = p.messages ?? [];
      if (arr.length < 2) return arr;
      const first = new Date(arr[0].sendAt).getTime();
      const last = new Date(arr[arr.length - 1].sendAt).getTime();
      return first > last ? [...arr].reverse() : arr;
    });

    // 페이지 간 순서도 오래된 페이지가 먼저 오게 정렬
    const pagesWithKey = pagesAscInside.map((msgs) => ({
      key: msgs.length ? new Date(msgs[0].sendAt).getTime() : Number.POSITIVE_INFINITY,
      msgs,
    }));
    pagesWithKey.sort((a, b) => a.key - b.key);

    return pagesWithKey.flatMap((x) => x.msgs);
  }, [data]);

  // 서버가 내려준 다음 커서 (마지막 페이지 기준)
  const nextCursor = useMemo(() => {
    const pages = data?.pages ?? [];
    if (!pages.length) return null;
    const last = pages[pages.length - 1];
    const c = last?.cursor;
    return c === 0 || c == null ? null : c;
  }, [data]);

  // 날짜 경계 판단
  const isDifferentDay = (prev: Date | null, curr: Date) => {
    if (!prev) return true;
    return (
      prev.getFullYear() !== curr.getFullYear() ||
      prev.getMonth() !== curr.getMonth() ||
      prev.getDate() !== curr.getDate()
    );
  };

  // 첫 로딩 완료 시 맨 아래로
  useEffect(() => {
    if (!isLoading && !isFetchingNextPage && messages?.length && !didInitialScroll) {
      bottomRef.current?.scrollIntoView({ block: 'end' });
      setDidInitialScroll(true);
    }
  }, [isLoading, isFetchingNextPage, messages?.length, didInitialScroll]);

  // IntersectionObserver: 상단 센티널 보이면 이전 페이지 로드
  useEffect(() => {
    const root = scrollRef.current;
    const target = topSentinelRef.current;
    if (!root || !target) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];
        if (
          entry.isIntersecting &&
          nextCursor &&
          lastRequestedCursorRef.current !== nextCursor &&
          !isFetchingNextPage
        ) {
          const prevHeight = root.scrollHeight;
          const prevTop = root.scrollTop;

          lastRequestedCursorRef.current = nextCursor;
          await fetchNextPage(); // 훅의 getNextPageParam이 서버 커서를 사용

          // 점프 방지
          requestAnimationFrame(() => {
            const nextHeight = root.scrollHeight;
            root.scrollTop = prevTop + (nextHeight - prevHeight);
          });
        }
      },
      {
        root,
        rootMargin: '200px 0px 0px 0px',
        threshold: 0,
      },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [fetchNextPage, nextCursor, isFetchingNextPage]);

  // roomId 변경 시 초기화
  useEffect(() => {
    lastRequestedCursorRef.current = null;
    setDidInitialScroll(false);
  }, [roomId]);

  return (
    <div className="flex h-full flex-col pb-40">
      <div className="flex h-14 items-center justify-between bg-[#1F56FF] px-5">
        <div className="flex items-center justify-start gap-3">
          <img src={img} onError={onErrorImage} alt={name} className="h-9 w-9 rounded-full" />
          <span className="text-[1rem] font-extrabold text-white">{name}</span>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 [transform:translateZ(0)] overflow-y-auto py-3 [will-change:transform] [contain:layout_paint]"
      >
        {/* 상단 센티널 */}
        <div ref={topSentinelRef} />

        {isFetchingNextPage && (
          <div className="py-2 text-center text-sm text-gray-500">이전 메시지 불러오는 중…</div>
        )}

        {messages?.map((message, index) => {
          const currentDate = new Date(message.sendAt);
          const prevDate = index > 0 ? new Date(messages[index - 1].sendAt) : null;
          const shouldShowDate = isDifferentDay(prevDate, currentDate);

          return (
            <div key={message.messageId} className="flex flex-col items-center gap-2">
              {shouldShowDate && (
                <div className="my-2 text-sm text-gray-500">
                  {currentDate.toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    weekday: 'short',
                  })}
                </div>
              )}
              <ChatText chat={message} />
            </div>
          );
        })}

        {/* 하단 앵커 */}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
