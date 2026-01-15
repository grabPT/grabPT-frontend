import { useCallback, useEffect, useRef } from 'react';

export function useDebounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  // 브라우저 환경(number)과 Node 환경(Timeout 객체) 모두 호환되도록 수정
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    },
    [func, delay],
  );
}
