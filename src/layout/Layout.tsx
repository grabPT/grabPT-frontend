// Layout.tsx
import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import { Outlet, useLocation } from 'react-router-dom';

import useScrollToTop from '@/hooks/useScrollToTop';
import Footer from '@/layout/components/Footer';
import Header from '@/layout/components/Header';
import useScrollStore from '@/store/useScrollStore';

function Layout() {
  const location = useLocation();
  const isFullWidthPage = location.pathname === '/';

  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  // ref를 store에 등록
  useEffect(() => {
    useScrollStore.getState().setContainerRef(scrollRef);
  }, []);

  // 경로 변경 시 스크롤
  useScrollToTop(location);

  // 스크롤 감지
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      setScrolled(el.scrollTop > 0);
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex h-screen flex-col">
      {/* 스크롤 여부를 Header로 전달 */}
      <Header scrolled={scrolled} />

      <section
        className="flex min-h-0 flex-1 basis-0 [transform:translateZ(0)] flex-col justify-between overflow-y-scroll [will-change:transform] [contain:layout_paint]"
        ref={scrollRef}
      >
        <main
          className={clsx(
            'min-h-[1000px]',
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
