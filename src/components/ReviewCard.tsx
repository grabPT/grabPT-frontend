import { useNavigate } from 'react-router-dom';

import Box from '@/components/Box';
import ProfileImage from '@/components/ProfileImage';
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
  centerName?: string;
  proId?: number;
  proNickName?: string;
  imageURL?: string;
  isProDetail?: boolean;
}

const ReviewCard = ({
  name,
  rating,
  content,
  centerName,
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
    <Box onClick={boxClick} width="w-[600px]">
      <div
        className={`relative flex w-full flex-col rounded-xl p-4 transition-all duration-300 ease-out hover:shadow-xl`}
      >
        {/* 상단 정보 */}
        <div className="relative z-10 mb-5 flex gap-4">
          {/* 아바타 */}
          <div className={`h-14 w-14 overflow-hidden rounded-full`}>
            <ProfileImage src={imageURL} alt={'프로필'} />
          </div>

          <div className="flex flex-col justify-center gap-1">
            {/* 이름 */}
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  role === 'PRO' || isProDetail
                    ? 'border border-blue-200 bg-blue-50 text-blue-700'
                    : 'border border-purple-200 bg-purple-50 text-purple-700'
                } `}
              >
                {role === 'PRO' || isProDetail ? 'From' : 'To'}
              </span>
              <span className={`text-base font-bold text-gray-900`}>
                {role === 'PRO' || isProDetail ? name : proNickName}
              </span>
            </div>

            {/* 센터 이름 */}
            {role !== 'PRO' && (
              <div className="flex items-center gap-1.5">
                <svg
                  className="h-3 w-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <span className="text-xs font-medium text-gray-500">{centerName}</span>
              </div>
            )}
            {/* 별점 */}
            <div className="mt-0.5">
              <StarRating rating={rating} size={12} fontSize={6} />
            </div>
          </div>
        </div>

        {/* 리뷰 내용 */}
        <div
          className={`relative z-10 flex-1 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100/50 p-4 transition-all duration-300`}
        >
          <p className="text-sm leading-relaxed font-medium text-gray-700">{content}</p>

          {/* 하단 페이드 효과 */}
          <div className="absolute right-0 bottom-0 left-0 h-6 rounded-b-xl bg-gradient-to-t from-gray-100/80 to-transparent" />
        </div>
      </div>
    </Box>
  );
};

/* ----------------- ReviewCard Skeleton ----------------- */
const ReviewCardSkeleton = () => {
  return (
    <Box.Skeleton width="w-[600px]" height="h-[214px]">
      <div className="relative flex w-full flex-col p-4">
        {/* 상단 */}
        <div className="mb-5 flex gap-4">
          <Skeleton className="h-14 w-14 rounded-full" />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-12 rounded-full" />
              <Skeleton className="h-4 w-24 rounded" />
            </div>
            <Skeleton className="h-3 w-32 rounded" />
            <Skeleton className="h-3 w-20 rounded" />
          </div>
        </div>

        {/* 리뷰 내용 */}
        <div className="flex-1">
          <Skeleton className="h-20 w-full rounded-xl" />
        </div>
      </div>
    </Box.Skeleton>
  );
};
ReviewCard.Skeleton = ReviewCardSkeleton;

export default ReviewCard;
