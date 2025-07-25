import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import clsx from 'clsx';

interface CheckedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isChecked?: boolean;
  width?: string;
  height?: string;
  text?: string;
}

const CheckedButton = ({
  isChecked = false,
  width,
  height = 'h-[42px]',
  text = 'text-[15px] font-semibold ',
  className = '',
  children,
  ...rest
}: PropsWithChildren<CheckedButtonProps>) => {
  const base = 'flex items-center justify-center rounded-[10px] transition-colors px-4 py-2';

  const inactive =
    'bg-[#f2f2f2] hover:bg-[var(--color-white-dark-hover)] text-black active:bg-[var(--color-white-dark-active)]]';
  const active =
    'bg-[color:var(--color-button)] text-white hover:bg-[color:var(--color-button-hover)] active:bg-[color:var(--color-button-pressed)]';

  const merged = clsx(base, width, height, text, isChecked ? active : inactive, className);

  return (
    <button className={merged} {...rest}>
      {children}
    </button>
  );
};

export default CheckedButton;
