// src/hooks/useUnreadCount.ts
import { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { privateInstance } from '@/libs/axios';
import { useStompStore } from '@/store/useStompStore';
import { useUserRoleStore } from '@/store/useUserRoleStore';

// 당신 프로젝트 axios 인스턴스

async function fetchUnreadTotal(): Promise<number> {
  const { data } = await privateInstance.get('/chat/unreadCount', { withCredentials: true });
  return data?.isSuccess ? (data.result as number) : 0;
}

export function useUnreadCount() {
  const queryClient = useQueryClient();
  const userId = useUserRoleStore((s) => s.userId);
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
        console.log(`api로 받아온 ${userId} unReadCount : ${count}`);
        if (!cancelled) setCount(initial);
      } catch {
        console.log('unReadCount 받아오기 실패');
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
  }, [userId, connected, subscribe, unsubscribe, queryClient, count]);

  return count;
}
