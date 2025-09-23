import { useNavigate } from 'react-router-dom';

import Profile from '@/assets/images/HeaderProfile.png';
import Box from '@/components/Box';
import { Skeleton } from '@/components/Skeleton';
import StarRating from '@/components/StarRating';
import { ROLES } from '@/constants/roles';
import { urlFor } from '@/constants/routes';
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
  isProDetail?: boolean;
}

const ReviewCard = ({
  name,
  rating,
  content,
  center,
  proId,
  proNickName,
  imageURL,
  isProDetail,
}: ReviewCardProps) => {
  const { role } = useRoleStore();
  const navigate = useNavigate();

  const boxClick = () => {
    if (role === ROLES.PRO) return;
    else navigate(urlFor.proDetail(proId));
  };

  return (
    <Box onClick={boxClick} className="cursor-pointer" width="w-[600px]">
      <div className="relative flex w-full flex-col p-[10px] pt-[15px]">
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
              {role === 'PRO' || isProDetail ? <>From. {name}</> : <>To. {proNickName}</>}
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

/* ----------------- ReviewCard Skeleton ----------------- */
const ReviewCardSkeleton = () => {
  return (
    <Box.Skeleton width="w-[600px]" height="h-[214px]">
      <div className="relative flex w-full flex-col p-[10px] pt-[15px]">
        {/* 상단 */}
        <div className="flex gap-[11px]">
          <Skeleton className="h-[47px] w-[47px] rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-[100px] rounded-md" />
            <Skeleton className="h-3 w-[80px] rounded-md" />
            <Skeleton className="h-3 w-[60px] rounded-md" />
          </div>
        </div>

        {/* 리뷰 내용 */}
        <div className="mt-[22px] flex-1">
          <Skeleton className="h-[60px] w-full rounded-md" />
        </div>
      </div>
    </Box.Skeleton>
  );
};

ReviewCard.Skeleton = ReviewCardSkeleton;

export default ReviewCard;
