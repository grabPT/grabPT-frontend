import { useEffect } from 'react';

import useScrollStore from '@/store/useScrollStore';

/**
 * 지정한 trigger 값이 바뀔 때마다 스크롤 컨테이너(혹은 window)를 최상단으로 이동시킨다.
 * @param trigger 스크롤을 일으킬 의존성 값(예: page, pathname 등)
 */
const useScrollToTop = (trigger: unknown) => {
  const containerRef = useScrollStore((s) => s.containerRef);

  useEffect(() => {
    (containerRef?.current ?? window).scrollTo({ top: 0, behavior: 'smooth' });
  }, [trigger, containerRef]);
};

export default useScrollToTop;
