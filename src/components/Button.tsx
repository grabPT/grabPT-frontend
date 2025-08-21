import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@/libs/cn';

import { Skeleton } from './Skeleton';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  width?: string;
  height?: string;
  text?: string;
}

const Button = ({
  label = '버튼',
  width = 'w-[98px]',
  height = 'h-[42px]',
  text = 'text-[15px] font-semibold text-white',
  className = '',
  children,
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  const base =
    'flex items-center justify-center rounded-[10px] ' +
    'bg-button hover:bg-button-hover ' +
    'active:bg-button-pressed';

  const merged = [base, width, height, text, className].filter(Boolean).join(' ');

  return (
    <button aria-label={label} className={merged} {...rest}>
      {children}
    </button>
  );
};

interface ButtonSkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

const ButtonSkeleton: React.FC<ButtonSkeletonProps> = ({
  width = 'w-[98px]',
  height = 'h-[42px]',
  className = '',
}) => {
  return <Skeleton className={cn('rounded-[10px]', width, height, className)} />;
};
ButtonSkeleton.displayName = 'Button.Skeleton';

Button.Skeleton = ButtonSkeleton;

export default Button;
