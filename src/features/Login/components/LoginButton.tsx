interface LoginButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'kakao' | 'naver' | 'google';
}
const colorMap = {
  kakao: 'bg-[#FFE812] text-black',
  naver: 'bg-[#00C73C] text-white',
  google: 'bg-white text-black border border-gray-300',
};

const LoginButton = ({ children, color = 'kakao', className = '' }: LoginButtonProps) => {
  return (
    <button
      className={`flex h-[3.25rem] w-[25.5625rem] cursor-pointer items-center justify-center rounded-[1.25rem] text-[1.25rem] font-semibold transition ${colorMap[color]} ${className}`}
    >
      {children}
    </button>
  );
};

export default LoginButton;
