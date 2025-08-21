// Header.tsx
import { Link } from 'react-router-dom';

import AppLogo from '@/assets/images/AppLogo.png';
import AuthMenu from '@/layout/components/AuthMenu';
import Navbar from '@/layout/components/Navbar';

interface HeaderProps {
  scrolled?: boolean;
}

function Header({ scrolled }: HeaderProps) {
  return (
    <header
      className={`relative z-20 flex min-h-[70px] justify-between px-10 transition-colors ${
        scrolled ? 'border-b border-gray-300 bg-white/90 backdrop-blur-sm' : ''
      }`}
    >
      <Link className="h-full w-[118px] px-[9px] pt-3" to={'/'}>
        <img src={AppLogo} alt="AppLogo" className="object-contain" />
      </Link>

      <Navbar />
      <AuthMenu />
    </header>
  );
}

export default Header;
