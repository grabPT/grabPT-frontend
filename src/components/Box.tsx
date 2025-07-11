import type { HTMLAttributes, PropsWithChildren } from 'react';

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

  const merged = [base, width, height, className].filter(Boolean).join(' ');

  return (
    <div className={merged} {...rest}>
      {children}
    </div>
  );
};

export default Box;
