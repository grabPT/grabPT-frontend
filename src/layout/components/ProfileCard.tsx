import Profile from '@/assets/images/HeaderProfile.png';
import StarRating from '@/components/StarRating';

const ProfileCard = () => {
  return (
    // 좌우패딩불일치, 일단34로 작업함
    <div className="flex h-[115px] w-[926px] items-center justify-between rounded-[30px] border-[1.5px] border-[#b8b8b8] px-[34px]">
      <div className="flex items-center gap-[33px]">
        <img src={Profile} alt="ProfileCardImage" className="h-[80px] w-[80px]" />

        <div>
          <p className="text-[20px] leading-[140%] font-semibold">복싱</p>
          <p className="text-[12px] leading-[140%] font-semibold tracking-[0.5em] text-[#697077]">
            박수민
          </p>
          <p className="mt-[5px] text-[8px] leading-[140%] font-semibold text-[#013EFB]">
            용암동헬스장 브라이언박 트레이닝 센터
          </p>
          {/* 별이 벗어나는 버그가 있었는데 flex적용하니까 고쳐짐. 이유는 모름;; */}
          <div className="mt-[4px] flex h-[12px]">
            <StarRating rating={4} size={12} />
          </div>
          <p className="mt-[2px] text-[6px] leading-[140%s] font-semibold">4.2</p>
        </div>
      </div>

      <div className="flex h-full items-end py-[17px]">
        <button className="h-[26px] w-[88px] rounded-[10px] bg-[#003EFB] px-[20px] py-[8px] text-[10px] leading-0 font-semibold text-white">
          프로필 편집
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
