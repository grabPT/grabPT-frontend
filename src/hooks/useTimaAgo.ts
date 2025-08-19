import { useEffect, useState } from 'react';

import { formatTimeAgo } from '@/utils/formatTimeAgo';

export function useTimeAgo(iso: string | Date | null | undefined, refreshMs = 60_000) {
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), refreshMs);
    return () => clearInterval(id);
  }, [refreshMs]);
  return formatTimeAgo(iso);
}
