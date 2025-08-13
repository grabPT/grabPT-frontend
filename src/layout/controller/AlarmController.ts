import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useAlarmStore } from '@/store/useAlarmStore';
import { useStompStore } from '@/store/useStompStore';
import { useUserRoleStore } from '@/store/useUserRoleStore';

export default function AlarmController() {
  const queryClient = useQueryClient();
  const userId = useUserRoleStore((s) => s.userId);
  const connected = useStompStore((s) => s.connected);
  const subscribe = useStompStore((s) => s.subscribe);
  const unsubscribe = useStompStore((s) => s.unsubscribe);
  const setAlarmCount = useAlarmStore((s) => s.setAlarmCount);

  useEffect(() => {
    if (!userId || !connected) return;
    const dest = `/subscribe/alarm/${userId}`;

    const sub = subscribe(dest, (val) => {
      const next = typeof val === 'number' ? val : Number(val ?? 0);
      // ["alarm"] 쿼리를 unfresh하게 변경
      queryClient.invalidateQueries({ queryKey: ['alarm'], exact: true });
      setAlarmCount(Number.isFinite(next) ? next : 0);
    });
    return () => unsubscribe(sub);
  }, [userId, connected, subscribe, unsubscribe, queryClient, setAlarmCount]);

  return null;
}
