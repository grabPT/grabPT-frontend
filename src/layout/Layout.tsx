import { Outlet, useLocation } from 'react-router-dom';

import Footer from '@/layout/components/Footer';
import Header from '@/layout/components/Header';

function Layout() {
  const location = useLocation();

  // 전체화면으로 보여야 할 경로 리스트
  const fullWidthRoutes = ['/user'];
  const isFullWidthPage = fullWidthRoutes.includes(location.pathname);

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <Header />

      <main
        className={`flex flex-1 flex-col justify-between overflow-y-scroll ${
          isFullWidthPage ? '' : 'px-[220px] max-[1440px]:px-[180px]'
        }`}
      >
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Layout;
