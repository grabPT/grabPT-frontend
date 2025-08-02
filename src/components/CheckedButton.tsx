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

  const inactive = 'bg-[#f2f2f2] hover:bg-white-dark-hover text-black active:bg-white-dark-active';
  const active = 'bg-button text-white hover:bg-button-hover active:bg-button-pressed';

  const merged = clsx(base, width, height, text, isChecked ? active : inactive, className);

  return (
    <button className={merged} {...rest}>
      {children}
    </button>
  );
};

export default CheckedButton;
