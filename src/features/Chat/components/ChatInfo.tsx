import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import HamburgerIcon from '@/assets/icons/HamburgerIcon';
import SearchIcon from '@/assets/icons/SearchIcon';
import ProfileImage from '@/components/ProfileImage';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { ChatText } from '@/features/Chat/components/ChatText';
import NewMessageModal from '@/features/Chat/components/NewMessageModal';
import SkeletonMessages from '@/features/Chat/components/SkeletonMessages';
import { useChatRenderItems } from '@/features/Chat/hooks/useChatRenderItems';
import { useChatRoomSocket } from '@/features/Chat/hooks/useChatRoomSocket';
import { useChatScroll } from '@/features/Chat/hooks/useChatScroll';
import { useGetMessagesInfinite } from '@/features/Chat/hooks/useGetMessages';
import { usePostReadWhenEnter } from '@/features/Chat/hooks/usePostReadWhenEnter';
import { usePostReadWhenExist } from '@/features/Chat/hooks/usePostReadWhenExist';
import type { messageType } from '@/features/Chat/types/getMessagesType';
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

  // 2) 데이터 패칭: 무한 스크롤 메시지
  const {
    data: messages,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetMessagesInfinite({
    roomId,
  });

  // 3) 렌더 아이템 & 커서 & 최신메시지 (Hook 분리)
  const { renderItems, latestMessage, nextCursor } = useChatRenderItems(messages);

  // 4) 스크롤 로직 (Hook 분리)
  const { scrollRef, topSentinelRef, bottomRef, isAtBottom, scrollToBottom } = useChatScroll(
    roomId,
    isLoading,
    isFetchingNextPage,
    renderItems.length,
    fetchNextPage,
    nextCursor,
  );

  const [isVisibleNewMessageModal, setIsVisibleNewMessageModal] = useState<boolean>(false);

  // 스크롤 의도 파악용 Ref (렌더링 후 스크롤 위함)
  const shouldScrollToBottomRef = useRef<boolean>(false);

  // 렌더링이 완료된 직후(DOM 업데이트 후) 스크롤 실행
  useLayoutEffect(() => {
    if (shouldScrollToBottomRef.current) {
      scrollToBottom();
      shouldScrollToBottomRef.current = false;
    }
  }, [renderItems, scrollToBottom]);

  // 스크롤이 바닥이면 모달 숨기기
  useEffect(() => {
    if (isAtBottom) {
      setIsVisibleNewMessageModal(false);
      readWhenExist(roomId);
    }
  }, [isAtBottom, readWhenExist, roomId]);

  // 5) 소켓 핸들러: 메시지 수신, 읽음상태 수신
  const onMessage = useCallback(
    (message: messageType) => {
      // 1. 스크롤 여부 판단 (데이터 업데이트 전)
      const isMyMessage = message.senderId === userId;
      const shouldScroll = isMyMessage || isAtBottom;

      if (shouldScroll) {
        shouldScrollToBottomRef.current = true;
        if (isMyMessage) {
          setIsVisibleNewMessageModal(false);
        } else {
          // 이미 바닥인 경우 읽음 처리만
          readWhenExist(roomId);
        }
      } else {
        // 스크롤 안 할 거면 모달 띄우기 (남의 메시지 + 스크롤 올라가 있음)
        setIsVisibleNewMessageModal(true);
      }

      // 2. 캐시 업데이트 (리렌더링 트리거)
      upsertIncomingMessage(queryClient, roomId, message);
      // 메시지업데이트마다 사이드바 방리스트 다시받아오기 (필요 시)
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CHAT.allList });
    },
    [queryClient, roomId, userId, readWhenExist, isAtBottom],
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

  // NewMessageModal에 전달할 스크롤 함수
  const handleScrollToBottom = useCallback(() => {
    scrollToBottom();
    setIsVisibleNewMessageModal(false);
    readWhenEnter(roomId);
  }, [readWhenEnter, roomId, scrollToBottom]);

  // 이미지 로드 시 스크롤 보정
  const handleImageLoad = useCallback(() => {
    // 이미 바닥 근처라면, 이미지가 로딩되어 길어졌을 때도 바닥 유지
    // 혹은 초기 로딩 시점(아직 스크롤 전) 등을 고려해야 함
    // 여기서는 "바닥 근처"면 강제 스크롤
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [isAtBottom, scrollToBottom]);

  // 6) 렌더
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
                <ChatText chat={item.message} imageUrl={img} onLoad={handleImageLoad} />
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
