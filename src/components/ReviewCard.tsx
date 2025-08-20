import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import Profile from '@/assets/images/HeaderProfile.png';
import XIcon from '@/assets/images/x.png';
import Box from '@/components/Box';
import StarRating from '@/components/StarRating';
import { useRoleStore } from '@/store/useRoleStore';

interface ReviewCardProps {
  name?: string;
  location?: string;
  rating: number; // 0‒5
  content: string;
  center?: string;
  proId?: number;
  proNickName?: string;
  imageURL?: string;
}

const ReviewCard = ({
  name,
  rating,
  content,
  center,
  proId,
  proNickName,
  imageURL,
}: ReviewCardProps) => {
  const { role } = useRoleStore();
  const navigate = useNavigate();

  const boxClick = () => {
    if (role === 'EXPERT') return;
    else navigate(`/expert/${proId}`);
  };

  return (
    <Box onClick={boxClick} className="cursor-pointer" width="w-[600px]">
      <div className="relative flex w-full flex-col p-[10px] pt-[15px]">
        {/* 삭제버튼 */}
        <img
          src={XIcon}
          alt="close"
          className={clsx('absolute top-2 right-2 h-4 w-4', role === 'EXPERT' && 'hidden')}
        />

        {/* 상단 정보 */}
        <div className="flex gap-[11px]">
          {/* 아바타 */}
          <div>
            <img
              src={imageURL ?? Profile}
              alt="profile"
              className="h-[47px] w-[47px] rounded-full"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-[16px] leading-[140%] font-semibold">
              {role === 'EXPERT' ? <>From. {name}</> : <>To. {proNickName}</>}
            </span>
            <span className="text-[12px] leading-[140%] font-semibold text-[#7A7A7A]">
              {center}
            </span>
            <StarRating rating={rating} size={10} fontSize={6} />
          </div>
        </div>

        {/* 리뷰 내용 */}
        <div className="mt-[22px] flex-1 rounded-md border border-[#B8B8B8] bg-white p-2 text-[10px] leading-[140%] font-medium text-[#525252]">
          {content}
        </div>
      </div>
    </Box>
  );
};

export default ReviewCard;
