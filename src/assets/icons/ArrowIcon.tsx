import { cn } from '@/libs/cn';

interface ArrowIconProps {
  className?: string;
  strokeWidth?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const ArrowIcon = ({ className, direction = 'right' }: ArrowIconProps) => {
  const rotateClass = {
    up: '-rotate-90',
    down: 'rotate-90',
    left: 'rotate-180',
    right: '',
  }[direction];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={cn('h-4 w-4 transition-transform duration-200', rotateClass, className)}
    >
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default ArrowIcon;
