import { useEffect, useRef } from 'react';

import clsx from 'clsx';
import { Outlet, useLocation } from 'react-router-dom';

import useScrollToTop from '@/hooks/useScrollToTop';
import Footer from '@/layout/components/Footer';
import Header from '@/layout/components/Header';
import useScrollStore from '@/store/useScrollStore';

function Layout() {
  const location = useLocation();
  const isFullWidthPage = location.pathname === '/';

  // 스크롤 조작 ref, store에 넘겨주기
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    useScrollStore.getState().setContainerRef(scrollRef); // 안전하게 등록
  }, []);

  // 경로 변경 시 스크롤
  useScrollToTop(location);

  return (
    <div className="flex h-screen flex-col">
      <Header />

      {/* 스크롤시 section내부요소가 잘리는 버그 발생. => GPU/페인팅 조작으로 일단 해결 */}
      {/* 뭐가 문젠지 아직도 잘 모르겠는데 일단 해결함;;; */}
      <section
        className="flex min-h-0 flex-1 basis-0 [transform:translateZ(0)] flex-col overflow-y-scroll [will-change:transform] [contain:layout_paint]"
        ref={scrollRef}
      >
        <main
          className={clsx(
            'min-h-full flex-1', // 남은 높이 채움
            !isFullWidthPage &&
              'px-[220px] max-[1440px]:px-[180px] max-[1280px]:px-[100px] max-[1024px]:px-[40px] max-[768px]:px-[20px]',
          )}
        >
          <Outlet />
        </main>

        <Footer />
      </section>
    </div>
  );
}

export default Layout;
