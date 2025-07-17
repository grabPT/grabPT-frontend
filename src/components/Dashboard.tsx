import Profile from '@/assets/images/HeaderProfile.png';
import Button from '@/components/Button';

const Dashboard = () => {
  const FIELDS = ['이름', '닉네임', '이메일'] as const;
  return (
    <div className="flex w-[812px]">
      <div className="ml-[16px] flex flex-col items-center gap-[30px]">
        <img src={Profile} alt="프로필" className="w-[180px]" />
        <Button width="w-[176px]" height="h-[42px]" text="text-[15px] font-semibold text-white">
          이미지 등록
        </Button>
      </div>

      <div className="mt-[19px] ml-[45px]">
        <ul className="flex flex-col gap-[20px]">
          {FIELDS.map((label) => (
            <li key={label} className="flex items-center justify-between gap-[40px]">
              <span className="w-10 text-right text-[15px] font-semibold">{label}</span>
              <input
                type="text"
                aria-label={label}
                className="h-[34px] w-[493px] rounded-[10px] border border-[#BABABA] p-2"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
