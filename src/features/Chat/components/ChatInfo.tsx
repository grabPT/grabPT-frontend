import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { ChatText } from '@/features/Chat/components/ChatText';
import NewMessageModal from '@/features/Chat/components/NewMessageModal';
import { useChatRoomSocket } from '@/features/Chat/hooks/useChatRoomSocket';
import { useGetMessagesInfinite } from '@/features/Chat/hooks/useGetMessages';
import { usePostReadWhenEnter } from '@/features/Chat/hooks/usePostReadWhenEnter';
import { usePostReadWhenExist } from '@/features/Chat/hooks/usePostReadWhenExist';
import type { messageType } from '@/features/Chat/types/getMessagesType';
import { isDifferentDay } from '@/features/Chat/utils/isDifferentDay';
import { useRoleStore } from '@/store/useRoleStore';
import { upsertIncomingMessage } from '@/utils/castCache';
import { onErrorImage } from '@/utils/onErrorImage';

interface ChatInfoProps {
  roomId: number;
  name: string;
  img: string;
}

export const ChatInfo = ({ roomId, name, img }: ChatInfoProps) => {
  // 1) 기본 세팅: QueryClient, 최초 입장 시 읽음 처리
  const queryClient = useQueryClient();

  const { mutate: readWhenEnter } = usePostReadWhenEnter(roomId);
  const { mutate: readWhenExist } = usePostReadWhenExist(roomId);

  const userId = useRoleStore((s) => s.userId);

  useEffect(() => {
    if (!roomId) return;
    readWhenEnter(roomId);
  }, [roomId, readWhenEnter]);

  // 7)번 로직에 정의된 isNearBottom 함수를 onMessage 핸들러에서 사용하기 위해 먼저 정의
  const scrollRef = useRef<HTMLDivElement>(null);
  const isNearBottom = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return true;
    const GAP = 800; // px: 바닥 인근으로 판단할 threshold
    return el.scrollHeight - el.scrollTop - el.clientHeight < GAP;
  }, []);

  // 2) 소켓 핸들러: 메시지 수신, 읽음상태 수신
  const onMessage = useCallback(
    (message: messageType) => {
      // 캐시에 새 메시지 반영 (리렌더 후 scroll은 아래 effect에서 처리)
      upsertIncomingMessage(queryClient, roomId, message);
      // 메시지업데이트마다 사이드바 방리스트 다시받아오기
      queryClient.invalidateQueries({ queryKey: ['chatList'], refetchType: 'active' });

      // ✨ 변경점: 스크롤이 바닥 근처에 있을 때만 읽음 처리를 호출
      if (isNearBottom()) {
        // 방 읽음처리
        readWhenExist(roomId);
      }
    },
    [queryClient, roomId, readWhenExist, isNearBottom],
  );

  const onReadStatus = useCallback(
    (payload: { messageId: number; readCount: number }) => {
      // 캐시 내 해당 messageId의 readCount 갱신
      queryClient.invalidateQueries({ queryKey: ['chatList'], refetchType: 'active' });
      queryClient.setQueryData(['Chat', roomId], (prev: any) => {
        if (!prev) return prev;

        const next = {
          ...prev,
          pages: prev.pages.map((page: any) => {
            // 서버 응답이 page.result.messages 형태인 경우
            if (page.result?.messages) {
              return {
                ...page,
                result: {
                  ...page.result,
                  messages: page.result.messages.map((m: messageType) =>
                    m.messageId === payload.messageId ? { ...m, readCount: payload.readCount } : m,
                  ),
                },
              };
            }
            return page;
          }),
        };

        return next;
      });
    },
    [queryClient, roomId],
  );

  // 채팅방 소켓 구독 (메시지/읽음 상태)
  useChatRoomSocket<messageType>(
    roomId,
    { onMessage: onMessage, onReadStatus: onReadStatus },
    { enableMessage: true, enableReadStatus: true },
  );

  // 3) 데이터 패칭: 무한 스크롤 메시지
  const {
    data: messages,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetMessagesInfinite({
    roomId,
  });

  // 4) 스크롤/센티널 레퍼런스 및 상태
  // scrollRef는 2)번 로직 위로 이동
  const topSentinelRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const lastRequestedCursorRef = useRef<number | null>(null);
  const [didInitialScroll, setDidInitialScroll] = useState<boolean>(false);

  // 5) 렌더용 메시지 가공
  // - pages[0]가 최신 페이지
  // - 각 페이지는 reverse 후, 오래된 페이지부터 앞으로 push → 최종 최신이 하단
  const totalMessages: messageType[] = useMemo(() => {
    const pages = messages?.pages ?? [];
    if (pages.length === 0) return [];
    const reversedMessages: messageType[] = [];
    //거꾸로 집어넣기~
    for (let i = pages.length - 1; i >= 0; i--) {
      const arr = pages[i].messages ?? [];
      const reversed = arr.length > 1 ? [...arr].reverse() : arr;
      reversedMessages.push(...reversed);
    }
    return reversedMessages;
  }, [messages]);

  // 다음 페이지 커서 (없으면 null)
  const nextCursor = useMemo(() => {
    const pages = messages?.pages ?? [];
    if (pages.length === 0) return null;
    const last = pages[pages.length - 1];
    const c = last?.cursor;
    return c === 0 || c == null ? null : c;
  }, [messages]);

  // 6) 최초 로딩 완료 시 하단으로 스크롤
  useEffect(() => {
    if (!isLoading && !isFetchingNextPage && totalMessages.length > 0 && !didInitialScroll) {
      const scrollContainer = scrollRef.current;
      if (scrollContainer) {
        // scrollIntoView 대신 scrollTop을 직접 조작 => scrollIntoView사용시 맨 밑에가 애매하게 남음 ㅇㅇ 바꾸니까 잘 내려감
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
      setDidInitialScroll(true);
    }
  }, [isLoading, isFetchingNextPage, totalMessages.length, didInitialScroll]);

  // 7) 신규 메시지 도착 시 하단 스크롤 (사용자가 바닥 근처일 때만)
  // isNearBottom 함수는 2)번 로직 위로 이동

  // 최신 메시지 'ID' 뿐만 아니라 '객체' 자체를 useMemo로 가져옵니다.
  const latestMessage = useMemo(
    () => (totalMessages.length ? totalMessages[totalMessages.length - 1] : null),
    [totalMessages],
  );

  const [isVisibleNewMessageModal, setIsVisibleNewMessageModal] = useState<boolean>(false);

  // NewMessageModal에 전달할 스크롤 함수를 정의합니다.
  const handleScrollToBottom = useCallback(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
    // 버튼 클릭 시 즉시 모달을 숨깁니다.
    setIsVisibleNewMessageModal(false);
    // ✨ 변경점: 모달 클릭(맨 아래로 이동) 시 방을 읽음 처리
    readWhenEnter(roomId);
  }, [readWhenEnter, roomId]);

  useEffect(() => {
    if (!latestMessage) return;

    // ✨ 변경점 1: 내가 보낸 메시지인지 확인하는 로직 추가
    // 최신 메시지를 보낸 사람이 '나' 자신이라면, 스크롤 위치와 상관없이 맨 아래로 내립니다.
    if (latestMessage.senderId === userId) {
      const scrollContainer = scrollRef.current;
      if (scrollContainer) {
        requestAnimationFrame(() => {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        });
      }
      // 혹시 다른 이유로 모달이 떠있을 수 있으니 확실하게 닫아줍니다.
      setIsVisibleNewMessageModal(false);
      return; // 이 로직을 실행했으면 아래 로직은 건너뜁니다.
    }

    // isNearBottom()의 결과에 따라 모달 표시 여부 결정 (기존 로직)
    if (!isNearBottom()) {
      setIsVisibleNewMessageModal(true);
      return;
    }

    // 바닥 근처에 있다면 자동으로 스크롤 (기존 로직)
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      requestAnimationFrame(() => {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      });
    }
  }, [latestMessage, userId, isNearBottom]); // ✨ 변경점 2: 의존성 배열에 latestMessage와 userId 추가

  // 8) 상단 센티널: 과거 페이지 추가 로드 & 스크롤 점프 방지
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

          // 새 컨텐츠 추가로 높이가 늘어난 만큼 보정하여 점프 방지
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

  // 9) 방 변경 시 스크롤 상태 리셋 (데이터는 캐시로 즉시 렌더)
  useEffect(() => {
    lastRequestedCursorRef.current = null;
    setDidInitialScroll(false);
  }, [roomId]);

  // 10) 렌더
  return (
    <div className="flex h-full flex-col pb-40">
      {/* 상단 헤더 */}
      <div className="flex h-14 items-center justify-between bg-[#1F56FF] px-5">
        <div className="flex items-center justify-start gap-3">
          <img src={img} onError={onErrorImage} alt={name} className="h-9 w-9 rounded-full" />
          <span className="text-[1rem] font-extrabold text-white">{name}</span>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden">
        {/* 본문 스크롤 영역 */}
        <div
          ref={scrollRef}
          className="h-full [transform:translateZ(0)] overflow-y-auto py-3 [will-change:transform] [contain:layout_paint]"
        >
          {/* 상단 센티널 (과거 로드 트리거) */}
          <div ref={topSentinelRef} />

          {isFetchingNextPage && (
            <div className="py-2 text-center text-sm text-gray-500">이전 메시지 불러오는 중…</div>
          )}
          {isError && (
            <div className="flex h-full w-full items-center justify-center">
              <h1 className="text-red-500">메시지를 불러오지 못했습니다.</h1>
            </div>
          )}

          {totalMessages.map((message, index) => {
            const currentDate = new Date(message.sentAt);
            const prevDate = index > 0 ? new Date(totalMessages[index - 1].sentAt) : null;
            const shouldShowDate = isDifferentDay(prevDate, currentDate);

            return (
              <div key={message.messageId} className="flex flex-col items-center gap-2">
                {shouldShowDate && (
                  <div className="my-2 text-sm text-gray-500">
                    {currentDate.toLocaleString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      weekday: 'short',
                    })}
                  </div>
                )}
                <ChatText chat={message} imageUrl={img} />
              </div>
            );
          })}
          {/* 하단 앵커 (최신이 맨 아래) */}
          <div ref={bottomRef} />
        </div>

        {/* 최신메시지 미리보기 */}
        {isVisibleNewMessageModal && (
          <NewMessageModal latestMessage={latestMessage} onScrollToBottom={handleScrollToBottom} />
        )}
      </div>
    </div>
  );
};
