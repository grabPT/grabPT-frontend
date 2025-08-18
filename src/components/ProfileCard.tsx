import { useNavigate } from 'react-router-dom';

import Profile from '@/assets/images/HeaderProfile.png';
import StarRating from '@/components/StarRating';
import ROUTES from '@/constants/routes';
import type { ProProfileType } from '@/types/ProPrifleType';

interface ProfileCardProps {
  profileData?: ProProfileType;
}

const ProfileCard = ({ profileData }: ProfileCardProps) => {
  const navigate = useNavigate();

  return (
    // 좌우패딩불일치, 일단34로 작업함
    <div className="xs:w-[340px] flex h-[115px] items-center justify-between rounded-[30px] border-[1.5px] border-[#b8b8b8] px-[34px] sm:w-[600px]">
      <div className="flex gap-[30px]">
        <img
          src={profileData?.profileImageUrl || Profile}
          alt="ProfileCardImage"
          className="h-20 w-20 rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.src = Profile;
          }}
        />

        <div className="flex flex-col justify-between">
          <p className="text-2xl leading-[140%] font-semibold">{profileData?.categoryName}</p>
          <p className="text-sm leading-none font-semibold tracking-[0.5em] text-[#697077]">
            {profileData?.userName}
          </p>
          <p className="text-[10px] font-semibold text-[#013EFB]">{profileData?.center}</p>
          {/* 별이 벗어나는 버그가 있었는데 flex적용하니까 고쳐짐. 이유는 모름;; */}
          <StarRating rating={profileData?.averageRating} size={14} fontSize={10} />
        </div>
      </div>

      <div className="xs:hidden h-full items-end py-[17px] sm:flex">
        <button
          className="h-[26px] w-[88px] cursor-pointer rounded-[10px] bg-[#003EFB] px-[20px] py-[8px] text-[10px] leading-0 font-semibold text-white"
          onClick={() => navigate(ROUTES.MYPAGE.EXPERT)}
        >
          프로필 편집
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
