import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { useRoleStore } from '@/store/useRoleStore';
import { useStompStore } from '@/store/useStompStore';
import { useUnreadStore } from '@/store/useUnreadStore';

export default function UnreadCountController() {
  const queryClient = useQueryClient();
  const userId = useRoleStore((s) => s.userId);
  const connected = useStompStore((s) => s.connected);
  const subscribe = useStompStore((s) => s.subscribe);
  const unsubscribe = useStompStore((s) => s.unsubscribe);
  const setUnReadCount = useUnreadStore((s) => s.setUnReadCount);

  useEffect(() => {
    if (!userId || !connected) return;
    const dest = `/subscribe/chat/${userId}/unread-count`;
    const sub = subscribe(dest, async (val) => {
      const next = typeof val === 'number' ? val : Number(val ?? 0);
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CHAT.allList });
      setUnReadCount(Number.isFinite(next) ? next : 0);
    });
    return () => unsubscribe(sub);
  }, [userId, connected, subscribe, unsubscribe, setUnReadCount, queryClient]);

  return null;
}
