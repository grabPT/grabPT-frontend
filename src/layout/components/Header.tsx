import { useEffect, useState } from 'react';

import clsx from 'clsx';
import { Link } from 'react-router-dom';

import LogoWithTextSVG from '@/assets/images/LogoWithTextSVG';
import ROUTES from '@/constants/routes';
import AuthMenu from '@/layout/components/AuthMenu';
import Navbar from '@/layout/components/Navbar';
import SideBar from '@/layout/components/SideBar';
import { useRoleStore } from '@/store/useRoleStore';
import useScrollStore from '@/store/useScrollStore';

const Header = () => {
  const { role } = useRoleStore();
  const isPro = role === 'PRO';

  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const { containerRef } = useScrollStore();

  useEffect(() => {
    const scrollElement = containerRef?.current;
    if (!scrollElement) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(scrollElement.scrollTop > 0);
          ticking = false;
        });
        ticking = true;
      }
    };

    scrollElement.addEventListener('scroll', handleScroll);
    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef]);

  return (
    <>
      <header
        className={clsx(
          'relative z-50',
          scrolled && 'border-b border-gray-300 bg-white/90 backdrop-blur-sm',
        )}
      >
        <div className="layout-container relative z-20 flex min-h-[55px] items-center justify-between sm:min-h-[70px]">
          <Link to={isPro ? ROUTES.HOME.PRO : ROUTES.HOME.ROOT} className="pb-1 sm:min-w-40">
            <LogoWithTextSVG />
          </Link>

          <Navbar />

          <AuthMenu onOpenSidebar={() => setIsSidebarOpen(true)} />
        </div>
      </header>

      <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Header;
