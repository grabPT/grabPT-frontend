import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string; // 접근성 레이블
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

const SignupBtn = ({ label, children, ...rest }: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      aria-label={label}
      className="flex h-[3.25rem] w-full items-center justify-center rounded-[1.25rem] bg-[color:var(--color-button)] text-[1.25rem] font-semibold text-white hover:bg-[color:var(--color-button-hover)] active:bg-[color:var(--color-button-pressed)]"
      {...rest}
    >
      {children}
    </button>
  );
};

export default SignupBtn;
