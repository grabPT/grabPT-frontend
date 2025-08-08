import { useEffect, useMemo, useRef, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { ChatText } from '@/features/Chat/components/ChatText';
import { useChatRoomSocket } from '@/features/Chat/hooks/useChatRoomSocket';
import { useGetMessagesInfinite } from '@/features/Chat/hooks/useGetMessages';
import { usePostReadWhenEnter } from '@/features/Chat/hooks/usePostReadWhenEnter';
import type { messageType } from '@/features/Chat/types/getMessagesType';
import { upsertIncomingMessage } from '@/utils/castCache';
import { onErrorImage } from '@/utils/onErrorImage';

interface ChatInfoProps {
  roomId: number;
  name: string;
  img: string;
}

export const ChatInfo = ({ roomId, name, img }: ChatInfoProps) => {
  const queryClient = useQueryClient();
  // 읽음처리 api 전송
  // chatroom/{roomid}/readWhenEnter
  const { mutate } = usePostReadWhenEnter(roomId);
  useEffect(() => {
    if (!roomId) return;
    mutate(roomId);
  }, [roomId, mutate]);
  // 채팅방 구독
  // /subscribe/chat/${roomId}
  // 3) 방 소켓 구독 (메시지 / 읽음상태)
  useChatRoomSocket<messageType>(
    roomId,
    {
      onMessage: (msg) => {
        upsertIncomingMessage(queryClient, roomId, msg);
        requestAnimationFrame(() => bottomRef.current?.scrollIntoView({ block: 'end' }));
      },
    },
    { enableMessage: true }, // 읽음/타이핑 안 쓰면 굳이 켤 필요 없음
  );
  // 읽음상태 구독
  // stompClient.subscribe(`/subscribe/chat/${roomId}/read-status`, (msg) => {
  // 메시지 올때마다 하나씩 읽음처리
  // chatroom/roomid/readWhenExist
  // 메시지 전송
  // stompClient.send(`/publish/chat/${currentRoomId}`, {}, JSON.stringify(dto));
  // 이미지보낼때는
  // file을 /chatRoom/{roomId}/upload 에 보내서 content에 담긴 이미지 url
  // 같이 담아서 보내기 (dto에)
  //
  const { data, fetchNextPage, isFetchingNextPage, isLoading } = useGetMessagesInfinite({ roomId });

  const scrollRef = useRef<HTMLDivElement>(null);
  const topSentinelRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const lastRequestedCursorRef = useRef<number | null>(null);
  const [didInitialScroll, setDidInitialScroll] = useState(false);

  // ▼ data.pages만으로 기존 정렬 로직을 재현:
  //    - pages[0] = 최신 페이지
  //    - 각 페이지는 reverse
  //    - 오래된 페이지부터(배열 뒤쪽부터) 앞으로 붙이기 → 결국 "첫 페이지 reverse, 이후 reverse-prepend"와 동일
  const totalMessages: messageType[] = useMemo(() => {
    const pages = data?.pages ?? [];
    if (!pages.length) return [];
    const out: messageType[] = [];
    for (let i = pages.length - 1; i >= 0; i--) {
      const arr = pages[i].messages ?? [];
      const reversed = arr.length > 1 ? [...arr].reverse() : arr;
      out.push(...reversed);
    }
    return out;
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

  // 방 변경 시 스크롤 상태만 리셋(데이터는 캐시로 즉시 그려짐)
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
