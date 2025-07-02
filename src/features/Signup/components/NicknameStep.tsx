import BackBtn from '@/features/Signup/assets/BackBtn.png';
import SignupBtn from '@/features/Signup/components/SignupBtn';


interface INicknameStep {
  onNext: () => void;
  onPrev: () => void;
}

export const NickNameStep = ({ onNext, onPrev }: INicknameStep) => {
  return (
    <div className="flex flex-col">
      <div className="mx-10 pt-4">
        <img
          src={BackBtn}
          alt="뒤로가기"
          onClick={onPrev}
        />
      </div>
      <div className='flex flex-col mt-32 mb-72 items-center justify-center'>
      <div className="flex items-center justify-center text-5xl font-extrabold whitespace-pre">
        <span className="text-[#003EFB]">닉네임</span>
        <span>을 정해주세요</span>
      </div>
      <div className='mt-50 h-20 flex items-center justify-center rounded-[0.625rem] w-96 border border-black bg-white'>
        <input
        placeholder='복싱 꿈나무'
        className='w-full font-normal text-2xl text-black h-full px-6'
        />
      </div>
      <div className=" mt-50 w-96">
        <SignupBtn children={'시작'} onClick={onNext} />
      </div>
    </div>
    </div>
  );
};
