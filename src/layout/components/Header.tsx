import { useEffect, useState } from 'react';

import clsx from 'clsx';
import { Link } from 'react-router-dom';

import AppLogo from '@/assets/images/AppLogo.png';
import AuthMenu from '@/layout/components/AuthMenu';
import Navbar from '@/layout/components/Navbar';
import useScrollStore from '@/store/useScrollStore';

const Header = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);

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
    <header
      className={clsx(
        'relative z-20 flex min-h-[70px] justify-between px-10',
        scrolled && 'border-b border-gray-300 bg-white/90 backdrop-blur-sm',
      )}
    >
      <Link className="h-full w-[118px] px-[9px] pt-3" to={'/'}>
        <img src={AppLogo} alt="AppLogo" className="object-contain" />
      </Link>

      <Navbar />
      <AuthMenu />
    </header>
  );
};

export default Header;
