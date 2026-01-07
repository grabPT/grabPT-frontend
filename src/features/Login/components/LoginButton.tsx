import GoogleLogo from '@/features/Login/assets//GoogleLogo.svg';
import KakaoLogo from '@/features/Login/assets//KakaoLogo.svg';
import NaverLogo from '@/features/Login/assets//NaverLogo.svg';

export type LoginProvider = 'kakao' | 'naver' | 'google';

interface LoginButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider: LoginProvider;
}

const PROVIDER_CONFIG: Record<
  LoginProvider,
  {
    className: string;
    logo: string;
    text: string;
    alt: string;
  }
> = {
  kakao: {
    className: 'bg-[#FFE812] text-black',
    logo: KakaoLogo,
    text: '카카오로 시작',
    alt: 'Kakao Logo',
  },
  naver: {
    className: 'bg-[#00C73C] text-white',
    logo: NaverLogo,
    text: '네이버로 시작',
    alt: 'Naver Logo',
  },
  google: {
    className: 'bg-white text-black border border-gray-300',
    logo: GoogleLogo,
    text: '구글로 시작',
    alt: 'Google Logo',
  },
};

/**
 * 로그인버튼 컴포넌트
 */
const LoginButton = ({ provider, onClick, className = '' }: LoginButtonProps) => {
  const config = PROVIDER_CONFIG[provider];

  return (
    <button
      onClick={onClick}
      className={`flex h-[3.25rem] w-[25.5625rem] cursor-pointer items-center justify-center rounded-[1.25rem] text-[1.25rem] font-semibold transition ${config.className} ${className}`}
    >
      <div className="flex items-center gap-2">
        <img src={config.logo} className="h-[1.875rem] w-[1.8765rem]" alt={config.alt} />
        {config.text}
      </div>
    </button>
  );
};

export default LoginButton;
