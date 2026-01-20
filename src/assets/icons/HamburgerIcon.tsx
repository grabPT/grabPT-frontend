import { cn } from '@/libs/cn';

interface HamburgerIconProps {
  className?: string;
  strokeWidth?: number;
}

const HamburgerIcon = ({ className, strokeWidth }: HamburgerIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={strokeWidth || 2}
    stroke="currentColor"
    className={cn('h-5 w-5', className)}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);

export default HamburgerIcon;
