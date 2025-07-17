import clsx from 'clsx';
import { Outlet, useLocation } from 'react-router-dom';

import Footer from '@/layout/components/Footer';
import Header from '@/layout/components/Header';

function Layout() {
  const location = useLocation();
  const isFullWidthPage = location.pathname === '/';

  return (
    <div className="flex h-screen flex-col">
      <Header />

      {/* 스크롤시 section내부요소가 잘리는 버그 발생. => GPU/페인팅 조작으로 일단 해결 */}
      {/* 뭐가 문젠지 아직도 잘 모르겠는데 일단 해결함;;; */}
      <section className="flex min-h-0 flex-1 basis-0 [transform:translateZ(0)] flex-col overflow-y-scroll [will-change:transform] [contain:layout_paint]">
        <main className={clsx(!isFullWidthPage && 'px-[220px] max-[1440px]:px-[180px]')}>
          <Outlet />
        </main>

        <Footer />
      </section>
    </div>
  );
}

export default Layout;
