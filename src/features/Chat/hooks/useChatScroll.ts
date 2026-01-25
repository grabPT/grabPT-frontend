import { useCallback, useEffect, useRef, useState } from 'react';

export const useChatScroll = (
  roomId: number,
  isLoading: boolean,
  isFetchingNextPage: boolean,
  renderItemsLength: number,
  fetchNextPage: () => Promise<any>,
  nextCursor: number | null,
) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const topSentinelRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const lastRequestedCursorRef = useRef<number | null>(null);
  const [didInitialScroll, setDidInitialScroll] = useState<boolean>(false);

  const [isAtBottom, setIsAtBottom] = useState<boolean>(true);

  // 스크롤 이벤트 감지하여 isAtBottom 상태 업데이트
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const isBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
      setIsAtBottom(isBottom);
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  // 바닥 인근 감지 (수동 체크용)
  const isNearBottom = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return true;
    return el.scrollHeight - el.scrollTop - el.clientHeight < 100;
  }, []);

  // 바닥으로 스크롤
  const scrollToBottom = useCallback(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, []);

  // 6) 최초 로딩 완료 시 하단으로 스크롤
  useEffect(() => {
    // renderItems가 준비되었고, 초기 스크롤을 안했다면 수행
    if (!isLoading && !isFetchingNextPage && renderItemsLength > 0 && !didInitialScroll) {
      scrollToBottom();
      setDidInitialScroll(true);
    }
  }, [isLoading, isFetchingNextPage, renderItemsLength, didInitialScroll, scrollToBottom]);

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
    setIsAtBottom(true);
  }, [roomId]);

  return {
    scrollRef,
    topSentinelRef,
    bottomRef,
    isNearBottom,
    isAtBottom,
    scrollToBottom,
  };
};
