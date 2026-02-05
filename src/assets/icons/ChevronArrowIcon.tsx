import { cn } from '@/libs/cn';

interface ChevronArrowIconProps {
  className?: string;
  strokeWidth?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const ChevronArrowIcon = ({
  className,
  strokeWidth = 2,
  direction = 'down', // Default to 'down' as per AlarmPage usage
}: ChevronArrowIconProps) => {
  const rotateClass = {
    up: 'rotate-180',
    down: '',
    left: 'rotate-90',
    right: '-rotate-90',
  }[direction];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('h-5 w-5 transition-transform duration-200', rotateClass, className)}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
};

export default ChevronArrowIcon;
