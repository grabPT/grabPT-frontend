import { Outlet } from 'react-router-dom';

import Footer from '@/layout/components/Footer';
import Header from '@/layout/components/Header';

function Layout() {
  
  return (
    <div className="flex h-screen flex-col">
      <Header />

      <main className="flex-1 px-[180px]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
