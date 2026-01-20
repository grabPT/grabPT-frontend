import { useMemo } from 'react';

import type { messageType } from '@/features/Chat/types/getMessagesType';
import { isDifferentDay } from '@/features/Chat/utils/isDifferentDay';

export type ChatItem =
  | { type: 'DATE'; id: string; date: Date }
  | { type: 'MESSAGE'; id: number; message: messageType };

export const useChatRenderItems = (messages: any) => {
  // 1) 렌더용 메시지 가공 (Render Item Pattern)
  const renderItems: ChatItem[] = useMemo(() => {
    const pages = messages?.pages ?? [];
    if (pages.length === 0) return [];

    const items: ChatItem[] = [];
    let lastDate: Date | null = null;

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

  // 2) 최신 메시지 (스크롤 트리거용)
  const latestMessage = useMemo(() => {
    const pages = messages?.pages ?? [];
    if (pages.length === 0) return null;
    const latestPage = pages[0];
    const latestMsgs = latestPage?.messages ?? [];
    return latestMsgs.length > 0 ? latestMsgs[0] : null;
  }, [messages]);

  // 3) 다음 페이지 커서 (없으면 null)
  const nextCursor = useMemo(() => {
    const pages = messages?.pages ?? [];
    if (pages.length === 0) return null;
    const last = pages[pages.length - 1];
    const c = last?.cursor;
    return c === 0 || c == null ? null : c;
  }, [messages]);

  return { renderItems, latestMessage, nextCursor };
};
