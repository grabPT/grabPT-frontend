interface LoginButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
color?: 'basic' | 'kakao' | 'naver' | 'google';
}
const colorMap = {
  basic: 'bg-[color:var(--color-button)] hover:bg-[color:var(--color-button-hover)] active:bg-[color:var(--color-button-pressed)] hover:bg-blue-700 text-white',
  kakao: 'bg-[#FFE812] text-black hover:bg-[#F7D800] active:bg-[#ECD500] ',
  naver: 'bg-[#00C73C] text-white hover:bg-[#02B24F] active:bg-[#019A45]',
  google: 'bg-white text-black border border-gray-300 hover:bg-gray-100 active:bg-gray-200',
};

export const LoginBtn = ({ children, color = 'basic',onClick, ...rest }: LoginButtonProps) => {
  return (
    <button
      className={`w-[25.5625rem]  h-[3.25rem] flex items-center justify-center cursor-pointer rounded-[1.25rem] text-[1.25rem] font-semibold transition ${colorMap[color]}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};