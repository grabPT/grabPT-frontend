import { useEffect } from 'react';

import { useStompStore } from '@/store/useStompStore';
import { useUnreadStore } from '@/store/useUnreadStore';
import { useUserRoleStore } from '@/store/useUserRoleStore';

// 로그인 유저 id 꺼내오는 곳 (당신 프로젝트 기준)

export default function UnreadCountController() {
  const userId = useUserRoleStore((s) => s.userId);
  const connected = useStompStore((s) => s.connected);
  const subscribe = useStompStore((s) => s.subscribe);
  const unsubscribe = useStompStore((s) => s.unsubscribe);
  const setUnReadCount = useUnreadStore((s) => s.setUnReadCount);

  useEffect(() => {
    if (!userId || !connected) return;
    const dest = `/subscribe/chat/${userId}/unread-count`;
    const sub = subscribe(dest, (val) => {
      const next = typeof val === 'number' ? val : Number(val ?? 0);
      setUnReadCount(Number.isFinite(next) ? next : 0);
    });
    return () => unsubscribe(sub);
  }, [userId, connected, subscribe, unsubscribe, setUnReadCount]);

  return null;
}
