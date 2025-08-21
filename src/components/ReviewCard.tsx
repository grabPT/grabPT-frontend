import { useState } from 'react';

import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import Profile from '@/assets/images/HeaderProfile.png';
import XIcon from '@/assets/images/x.png';
import Box from '@/components/Box';
import Button from '@/components/Button';
import { Skeleton } from '@/components/Skeleton';
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
  isExpertDetail?: boolean;
}

const ReviewCard = ({
  name,
  rating,
  content,
  center,
  proId,
  proNickName,
  imageURL,
  isExpertDetail,
}: ReviewCardProps) => {
  const { role } = useRoleStore();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const boxClick = () => {
    if (role === 'EXPERT') return;
    else navigate(`/expert/${proId}`);
  };
  const handleDeleteRequest = () => {};
  return (
    <Box onClick={boxClick} className="cursor-pointer" width="w-[600px]">
      <div className="relative flex w-full flex-col p-[10px] pt-[15px]">
        {/* 삭제버튼 */}
        {!(role === 'EXPERT' || isExpertDetail) && (
          <button
            type="button"
            onClick={(e) => {
              console.log('X 버튼 클릭!'); // 디버그
              e.stopPropagation();
              setModalOpen(true);
            }}
            className={clsx(
              'absolute top-1 right-1 z-50 flex h-8 w-8 items-center justify-center p-1',
              'rounded-full bg-white/80 shadow-sm transition-colors hover:bg-gray-100',
            )}
            aria-label="삭제"
          >
            <img src={XIcon} alt="close" className="pointer-events-none h-4 w-4" />
          </button>
        )}

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
              {role === 'EXPERT' || isExpertDetail ? <>From. {name}</> : <>To. {proNickName}</>}
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
      {modalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex h-screen min-h-screen w-screen items-center justify-center bg-black/40"
            onClick={(e) => {
              e.stopPropagation();
              setModalOpen(false);
            }}
          >
            <div
              className="mx-auto my-auto flex w-[min(92vw,520px)] flex-col justify-center rounded-xl bg-white p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center justify-center">
                <h1>요청서를 삭제하시겠습니까?</h1>
                <div className="flex items-center justify-center gap-3">
                  <Button
                    onClick={() => {
                      setModalOpen(false);
                    }}
                  >
                    취소
                  </Button>
                  <Button onClick={handleDeleteRequest}>삭제</Button>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
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
