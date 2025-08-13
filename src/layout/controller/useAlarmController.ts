import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useAlarmStore } from '@/store/useAlarmStore';
import { useStompStore } from '@/store/useStompStore';
import { useUserRoleStore } from '@/store/useUserRoleStore';

export default function UnAlarmController() {
  const queryClient = useQueryClient();
  const userId = useUserRoleStore((s) => s.userId);
  const connected = useStompStore((s) => s.connected);
  const subscribe = useStompStore((s) => s.subscribe);
  const unsubscribe = useStompStore((s) => s.unsubscribe);
  const setAlramCount = useAlarmStore((s) => s.alarmCount);

  // useEffect(() => {
  //   if (!userId || !connected) return;
  //   const dest = `/subscribe/chat/${userId}/unread-count`;
  //   const sub = subscribe(dest, async (val) => {
  //     const next = typeof val === 'number' ? val : Number(val ?? 0);
  //     await queryClient.invalidateQueries({ queryKey: ['chatList'], refetchType: 'active' });
  //     // setAlramCount(Number.isFinite(next) ? next : 0);
  //   });
  //   return () => unsubscribe(sub);
  // }, [userId, connected, subscribe, unsubscribe, setUnReadCount, queryClient]);

  return null;
}
