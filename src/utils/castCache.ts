import { QueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/queryKeys';
import type { messageType } from '@/features/Chat/types/getMessagesType';

export const upsertIncomingMessage = (
  queryClient: QueryClient,
  roomId: number,
  incoming: messageType,
) => {
  const toNum = (x: any) => Number(x);

  queryClient.setQueryData(QUERY_KEYS.CHAT.messages({ roomId }), (prev: any) => {
    // 1) 비어있을 때: 당신의 select 구조를 그대로 생성
    if (!prev) {
      return {
        result: { cursor: null, messages: [incoming] },
        pages: [{ result: { cursor: null, messages: [incoming] } }],
        pageParams: [],
      };
    }

    // 2) 얕은 불변 업데이트
    const next = {
      ...prev,
      pages: Array.isArray(prev.pages) ? [...prev.pages] : [],
      pageParams: Array.isArray(prev.pageParams) ? [...prev.pageParams] : [],
    };

    // 3) 최신 페이지 확보
    if (!next.pages[0]) next.pages[0] = { result: { cursor: null, messages: [] } };
    const page0 = { ...next.pages[0] }; // 페이지 자체도 새 레퍼런스
    next.pages[0] = page0;

    // 4) 실제 메시지 컨테이너 결정: result.messages 우선
    //    (없으면 page0.messages를 사용)
    let container: any;
    if (page0.result?.messages) {
      page0.result = { ...page0.result };
      container = { owner: page0.result, key: 'messages' as const };
    } else {
      container = { owner: page0, key: 'messages' as const };
    }

    const arr: messageType[] = Array.isArray(container.owner[container.key])
      ? [...container.owner[container.key]]
      : [];

    // 5) upsert
    const idx = arr.findIndex((m) => toNum(m.messageId) === toNum(incoming.messageId));
    if (idx >= 0) {
      arr[idx] = { ...arr[idx], ...incoming };
    } else {
      // 최신→과거 정렬 가정: 앞에 삽입
      arr.unshift(incoming);
    }
    container.owner[container.key] = arr;

    // 6) 선택: 최상위 result도 동기화 (당신이 어디선가 data.result.*를 쓴다면)
    if (next.result?.messages) {
      next.result = { ...next.result, messages: arr };
    }

    return next;
  });
};
