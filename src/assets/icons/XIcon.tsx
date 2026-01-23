import { cn } from '@/libs/cn';

interface XIconProps {
  className?: string;
  strokeWidth?: number;
}

const XIcon = ({ className, strokeWidth }: XIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={strokeWidth || 2}
    stroke="currentColor"
    className={cn('h-5 w-5', className)}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default XIcon;
