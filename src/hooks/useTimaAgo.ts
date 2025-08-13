import { useEffect, useState } from 'react';

import { formatTimeAgo } from '@/utils/formatTimeAgo';

export function useTimeAgo(isoString: string | Date, refreshMs = 60_000) {
  const [, setTick] = useState(0);

  // 1분마다 다시 렌더 → 상대 시간이 자동 업데이트
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), refreshMs);
    return () => clearInterval(id);
  }, [refreshMs]);

  return formatTimeAgo(isoString);
}
