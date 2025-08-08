import { QueryClient } from '@tanstack/react-query';

import type { messageType } from '@/features/Chat/types/getMessagesType';

export const upsertIncomingMessage = (
  queryClient: QueryClient,
  roomId: number,
  incoming: messageType,
) => {
  queryClient.setQueryData<any>(['Chat', roomId], (prev: any) => {
    if (!prev) {
      return { pages: [{ cursor: null, messages: [incoming] }], pageParams: [] };
    }
    const next = structuredClone(prev);
    const page0 = next.pages?.[0] ?? (next.pages[0] = { cursor: null, messages: [] });

    const idx = page0.messages.findIndex((m: messageType) => m.messageId === incoming.messageId);
    if (idx >= 0) page0.messages[idx] = { ...page0.messages[idx], ...incoming };
    else page0.messages.unshift(incoming); // 원본은 최신→과거, 렌더에서 reverse하므로 맨 아래로 감

    return next;
  });
};
