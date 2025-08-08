// src/hooks/useUnreadCount.ts
import { useEffect, useState } from 'react';

import { privateInstance } from '@/libs/axios';
import { useStompStore } from '@/store/useStompStore';

// 당신 프로젝트 axios 인스턴스

async function fetchUnreadTotal(): Promise<number> {
  const { data } = await privateInstance.get('/chat/unreadCount', { withCredentials: true });
  console.log(data);
  return data?.isSuccess ? (data.result as number) : 0;
}

export function useUnreadCount(userId?: number | null) {
  const connected = useStompStore((s) => s.connected);
  const subscribe = useStompStore((s) => s.subscribe);
  const unsubscribe = useStompStore((s) => s.unsubscribe);

  const [count, setCount] = useState(0);

  useEffect(() => {
    let sub: any = null;
    let cancelled = false;

    (async () => {
      // 로그인 전이면 대기
      if (!userId) return;

      // 초기값 REST
      try {
        const initial = await fetchUnreadTotal();
        if (!cancelled) setCount(initial);
      } catch {
        /* noop */
      }

      // STOMP 구독
      if (connected) {
        sub = subscribe(`/subscribe/chat/${userId}/unread-count`, (val) => {
          setCount(typeof val === 'number' ? val : Number(val ?? 0));
        });
      }
    })();

    return () => {
      cancelled = true;
      unsubscribe(sub);
    };
  }, [userId, connected, subscribe, unsubscribe]);

  console.log(`unReadCount : ${count}`);
  return count;
}
