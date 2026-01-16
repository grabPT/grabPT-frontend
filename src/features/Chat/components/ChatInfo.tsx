import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import HamburgerIcon from '@/assets/icons/HamburgerIcon';
import SearchIcon from '@/assets/icons/SearchIcon';
import ProfileImage from '@/components/ProfileImage';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { ChatText } from '@/features/Chat/components/ChatText';
import NewMessageModal from '@/features/Chat/components/NewMessageModal';
import SkeletonMessages from '@/features/Chat/components/SkeletonMessages';
import { useChatRoomSocket } from '@/features/Chat/hooks/useChatRoomSocket';
import { useGetMessagesInfinite } from '@/features/Chat/hooks/useGetMessages';
import { usePostReadWhenEnter } from '@/features/Chat/hooks/usePostReadWhenEnter';
import { usePostReadWhenExist } from '@/features/Chat/hooks/usePostReadWhenExist';
import type { messageType } from '@/features/Chat/types/getMessagesType';
import { isDifferentDay } from '@/features/Chat/utils/isDifferentDay';
import { useRoleStore } from '@/store/useRoleStore';
import { upsertIncomingMessage } from '@/utils/castCache';

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
      // 캐시에 새 메시지 반영
      upsertIncomingMessage(queryClient, roomId, message);
      // 메시지업데이트마다 사이드바 방리스트 다시받아오기 (필요 시)
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CHAT.allList });

      // ✨ 최적화: 내가 보낸 메시지면 즉시 스크롤 (useEffect 의존성 제거)
      if (message.senderId === userId) {
        requestAnimationFrame(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          }
        });
        setIsVisibleNewMessageModal(false);
      } else {
        // 남이 보낸 메시지: 바닥 근처일 때만 읽음처리 + 스크롤
        if (isNearBottom()) {
          readWhenExist(roomId);
          requestAnimationFrame(() => {
            if (scrollRef.current) {
              scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
          });
        } else {
          // 바닥이 아니면 "새 메시지" 모달만 띄움
          setIsVisibleNewMessageModal(true);
        }
      }
    },
    [queryClient, roomId, userId, readWhenExist, isNearBottom],
  );

  const onReadStatus = useCallback(
    (payload: { messageId: number; readCount: number }) => {
      // 캐시 내 해당 messageId의 readCount 갱신
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CHAT.allList });
      queryClient.setQueryData(QUERY_KEYS.CHAT.messages({ roomId }), (prev: any) => {
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

  // 5) 렌더용 메시지 가공 (Render Item Pattern)
  // - 메시지와 날짜구분선을 하나의 배열로 플랫하게 만들어 렌더링 시 연산을 최소화합니다.
  type ChatItem =
    | { type: 'DATE'; id: string; date: Date }
    | { type: 'MESSAGE'; id: number; message: messageType };

  const renderItems: ChatItem[] = useMemo(() => {
    const pages = messages?.pages ?? [];
    if (pages.length === 0) return [];

    const items: ChatItem[] = [];
    let lastDate: Date | null = null;

    // 페이지는 역순(과거->최신)으로 정렬되어 있다고 가정하고 처리
    // pages[length-1]가 가장 과거인지, pages[0]가 가장 최신인지 확인 필요.
    // 기존 로직: pages[i]를 역순회(최신->과거)하면서 reversedMessages에 push.
    // 즉 reversedMessages는 [가장오래된거, ..., 가장최신거] 순서임.

    // 1. 전체 메시지를 시간순(오래된 -> 최신)으로 평탄화
    const flattened: messageType[] = [];
    for (let i = pages.length - 1; i >= 0; i--) {
      const arr = pages[i].messages ?? [];
      const reversed = arr.length > 1 ? [...arr].reverse() : arr;
      flattened.push(...reversed);
    }

    // 2. 순회하며 날짜 구분선 삽입
    for (const msg of flattened) {
      const currDate = new Date(msg.sentAt);
      if (isDifferentDay(lastDate, currDate)) {
        items.push({
          type: 'DATE',
          id: `date-${msg.sentAt}`,
          date: currDate,
        });
        lastDate = currDate;
      }
      items.push({
        type: 'MESSAGE',
        id: msg.messageId,
        message: msg,
      });
    }

    return items;
  }, [messages]);

  // 최신 메시지 (스크롤 트리거용)
  const latestMessage = useMemo(() => {
    const pages = messages?.pages ?? [];
    if (pages.length === 0) return null;
    const latestPage = pages[0];
    const latestMsgs = latestPage?.messages ?? [];
    return latestMsgs.length > 0 ? latestMsgs[0] : null;
  }, [messages]);

  const [isVisibleNewMessageModal, setIsVisibleNewMessageModal] = useState<boolean>(false);

  // NewMessageModal에 전달할 스크롤 함수
  const handleScrollToBottom = useCallback(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
    setIsVisibleNewMessageModal(false);
    readWhenEnter(roomId);
  }, [readWhenEnter, roomId]);

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
    // renderItems가 준비되었고, 초기 스크롤을 안했다면 수행
    if (!isLoading && !isFetchingNextPage && renderItems.length > 0 && !didInitialScroll) {
      const scrollContainer = scrollRef.current;
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
      setDidInitialScroll(true);
    }
  }, [isLoading, isFetchingNextPage, renderItems.length, didInitialScroll]);

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
      <div className="sticky top-0 z-10 flex h-19 w-full items-center justify-between border-b border-gray-100 bg-white/90 px-6 backdrop-blur-md">
        <div className="flex w-full items-center justify-between">
          <span className="flex items-center gap-4">
            <div className="h-9 w-9 overflow-hidden rounded-full">
              <ProfileImage src={img} alt="프로필사진" />
            </div>
            <span className="flex-1 text-[1.05rem] leading-tight font-bold text-gray-900">
              {name}
            </span>
          </span>
          <div className="flex items-center gap-2">
            <SearchIcon />
            <HamburgerIcon className="h-7 w-7" />
          </div>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden">
        {isLoading && <SkeletonMessages />}
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

          {renderItems.map((item) => {
            if (item.type === 'DATE') {
              return (
                <div key={item.id} className="my-2 text-center text-sm text-gray-500 select-none">
                  {item.date.toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    weekday: 'short',
                  })}
                </div>
              );
            }

            return (
              <div key={item.id} className="flex flex-col items-center gap-2">
                <ChatText chat={item.message} imageUrl={img} />
              </div>
            );
          })}

          {/* 하단 앵커 (최신이 맨 아래) */}
          <div ref={bottomRef} />
        </div>

        {/* 최신메시지 미리보기 */}
        {isVisibleNewMessageModal && (
          <NewMessageModal
            profileImage={img}
            latestMessage={latestMessage}
            onScrollToBottom={handleScrollToBottom}
          />
        )}
      </div>
    </div>
  );
};
