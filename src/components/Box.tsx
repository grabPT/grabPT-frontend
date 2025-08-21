import type { HTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@/libs/cn';

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
  className?: string;
}

const Box = ({
  width = 'w-[800px]',
  height = 'h-[214px]',
  className = '',
  children,
  ...rest
}: PropsWithChildren<BoxProps>) => {
  const base = 'flex rounded-[10px] shadow-[4px_4px_10px_0_rgba(0,0,0,0.2)]';

  const merged = cn(base, width, height, className);

  return (
    <div className={merged} {...rest}>
      {children}
    </div>
  );
};

interface BoxSkeletonProps extends PropsWithChildren {
  width?: string;
  height?: string;
  className?: string;
}

const BoxSkeleton: React.FC<BoxSkeletonProps> = ({
  width = 'w-[800px]',
  height = 'h-[214px]',
  className = '',
  children,
}) => {
  return (
    <div className={cn('animate-pulse rounded-[10px] bg-[#E6E6E6]', width, height, className)}>
      {children}
    </div>
  );
};

BoxSkeleton.displayName = 'Box.Skeleton';
Box.Skeleton = BoxSkeleton;

export default Box;
