import { useState } from 'react';

import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import XIcon from '@/assets/images/x.png';
import Box from '@/components/Box';
import Button from '@/components/Button';
import ProfileImage from '@/components/ProfileImage';
import { Skeleton } from '@/components/Skeleton';
import { urlFor } from '@/constants/routes';
import { useDeleteRequest } from '@/features/UserMypage/hooks/useDeleteRequest';
import Hashtag from '@/features/home/components/Hashtag';
import { TIME_SLOT_LABELS } from '@/types/ReqeustsType';
import type { Tags } from '@/types/Tags';

interface RequestCardProps {
  name: string;
  tags: Tags;
  content: string;
  location: string;
  profileImg?: string;
  requestionId: number;
  isWriter?: boolean;
}

const RequestCard = ({
  name,
  tags,
  content,
  location,
  profileImg,
  requestionId,
  isWriter,
}: RequestCardProps) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const daysPerWeek = `주 ${tags.daysPerWeek}회`;

  const tagsResult = [
    ...tags.categoryName.split(' '),
    ...tags.availableTimes.map((time) => TIME_SLOT_LABELS[time]),
    daysPerWeek,
  ];
  const { mutate } = useDeleteRequest();
  const handleDeleteRequest = () => {
    mutate(requestionId, {
      onSuccess: () => {
        setModalOpen(false);
        window.location.reload();
      },
      onError: (error) => {
        console.error('삭제 실패:', error);
        setModalOpen(false);
        alert(error.message);
      },
    });
  };
  return (
    <Box width="w-[600px]">
      <div
        className="relative flex h-full w-full cursor-pointer flex-col p-[10px] pt-[15px]"
        onClick={() => navigate(urlFor.requestDetail(requestionId))}
      >
        {/* 삭제버튼 */}
        {isWriter && (
          <button
            type="button"
            className={clsx('absolute top-1 right-1 z-50 flex items-center justify-center')}
            aria-label="삭제"
            onClick={(e) => {
              e.stopPropagation();
              setModalOpen(true);
            }}
          >
            <img src={XIcon} alt="close" className="pointer-events-none h-4 w-4" />
          </button>
        )}
        {/* 상단 정보 */}
        <div className="flex items-start gap-[11px]">
          {/* 아바타 */}
          <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
            <ProfileImage src={profileImg} alt="profile" />
          </div>

          <div className="flex flex-col">
            <span className="text-[16px] leading-[140%] font-semibold">{name}</span>
            <span className="text-[12px] leading-[140%] font-semibold text-[#7A7A7A]">
              {location}
            </span>
          </div>
        </div>

        <div className="mt-[22px] flex flex-1 flex-col justify-between gap-4">
          <div className="flex gap-1.5">
            {tagsResult.map((tag, idx) => (
              <Hashtag key={idx} tag={tag} />
            ))}
          </div>
          {/* 리뷰 내용 */}
          <div className="flex-1 rounded-md border border-[#B8B8B8] bg-white p-2 text-[10px] leading-[140%] font-medium text-[#525252]">
            {content}
          </div>
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
              <div className="flex h-60 flex-col items-center justify-center gap-10">
                <div className="flex flex-1 items-center justify-center">
                  <h1 className="text-2xl font-semibold">요청서를 삭제하시겠습니까?</h1>
                </div>
                <div className="grid w-full grid-cols-2 items-center justify-center gap-6">
                  <Button
                    onClick={() => {
                      setModalOpen(false);
                    }}
                    width="w-full"
                  >
                    취소
                  </Button>
                  <Button onClick={handleDeleteRequest} width="w-full">
                    삭제
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </Box>
  );
};

const RequestCardSkeleton = () => {
  return (
    <Box.Skeleton width="w-[600px]" height="h-[214px]">
      <div className="relative flex h-full w-full flex-col p-[10px] pt-[15px]">
        {/* 닫기 버튼 */}
        <Skeleton className="absolute top-2 right-2 h-4 w-4 rounded-full" />

        {/* 상단 프로필 */}
        <div className="flex items-start gap-[11px]">
          <Skeleton className="h-[50px] w-[50px] rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-3 w-32 rounded" />
          </div>
        </div>

        {/* 태그 + 리뷰 */}
        <div className="mt-[22px] flex flex-1 flex-col justify-between gap-4">
          <div className="flex gap-1.5">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} className="h-5 w-14 rounded-full" />
            ))}
          </div>
          <Skeleton className="flex-1 rounded-md border border-[#B8B8B8]" />
        </div>
      </div>
    </Box.Skeleton>
  );
};

RequestCardSkeleton.displayName = 'RequestCard.Skeleton';
RequestCard.Skeleton = RequestCardSkeleton;
export default RequestCard;
