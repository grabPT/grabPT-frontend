import { useEffect, useMemo, useRef, useState } from 'react';

import { ChatText } from '@/features/Chat/components/ChatText';
import { useGetMessagesInfinite } from '@/features/Chat/hooks/useGetMessages';
import type { messageType } from '@/features/Chat/types/getMessagesType';
import { onErrorImage } from '@/utils/onErrorImage';

interface ChatInfoProps {
  roomId: number;
  name: string;
  img: string;
}

export const ChatInfo = ({ roomId, name, img }: ChatInfoProps) => {
  const { data, fetchNextPage, isFetchingNextPage, isLoading } = useGetMessagesInfinite({ roomId });

  const scrollRef = useRef<HTMLDivElement>(null);
  const topSentinelRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const lastRequestedCursorRef = useRef<number | null>(null);
  const processedPageCountRef = useRef(0); // 몇 개의 page를 반영했는지 추적

  const [didInitialScroll, setDidInitialScroll] = useState(false);
  const [totalMessages, setTotalMessages] = useState<messageType[]>([]);

  // ▼ 핵심: 첫 페이지는 reverse 해서 set, 이후 페이지는 reverse 해서 앞에 prepend
  useEffect(() => {
    const pages = data?.pages ?? [];
    if (!pages.length) return;

    // 새로 추가된 페이지만 처리
    for (let i = processedPageCountRef.current; i < pages.length; i++) {
      const arr = pages[i].messages ?? [];
      const reversed = arr.length > 1 ? [...arr].reverse() : arr; // 원본 불변성 유지

      if (i === 0 && processedPageCountRef.current === 0) {
        // 첫 페이지: 교체
        setTotalMessages(reversed);
      } else {
        // 이후 페이지: 앞에 붙이기 (unshift 대신 불변성 유지)
        setTotalMessages((prev) => [...reversed, ...prev]);
      }
    }
    processedPageCountRef.current = pages.length;
  }, [data]);

  // 다음 커서 (중복 요청 방지용)
  const nextCursor = useMemo(() => {
    const pages = data?.pages ?? [];
    if (!pages.length) return null;
    const last = pages[pages.length - 1];
    const c = last?.cursor;
    return c === 0 || c == null ? null : c;
  }, [data]);

  const isDifferentDay = (prev: Date | null, curr: Date) => {
    if (!prev) return true;
    return (
      prev.getFullYear() !== curr.getFullYear() ||
      prev.getMonth() !== curr.getMonth() ||
      prev.getDate() !== curr.getDate()
    );
  };

  // 첫 로딩 후 맨 아래로
  useEffect(() => {
    if (!isLoading && !isFetchingNextPage && totalMessages.length && !didInitialScroll) {
      bottomRef.current?.scrollIntoView({ block: 'end' });
      setDidInitialScroll(true);
    }
  }, [isLoading, isFetchingNextPage, totalMessages.length, didInitialScroll]);

  // IO로 상단 도달 시 이전 페이지 로드 + 점프 방지
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
          await fetchNextPage();

          requestAnimationFrame(() => {
            const nextHeight = root.scrollHeight;
            root.scrollTop = prevTop + (nextHeight - prevHeight);
          });
        }
      },
      { root, rootMargin: '200px 0px 0px 0px', threshold: 0 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [fetchNextPage, nextCursor, isFetchingNextPage]);

  // 방 변경 시 초기화
  useEffect(() => {
    lastRequestedCursorRef.current = null;
    processedPageCountRef.current = 0;
    setTotalMessages([]);
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

        {totalMessages.map((message, index) => {
          const currentDate = new Date(message.sendAt);
          const prevDate = index > 0 ? new Date(totalMessages[index - 1].sendAt) : null;
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

        {/* 하단 앵커: 최신이 맨 아래 */}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
