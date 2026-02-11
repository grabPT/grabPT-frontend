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
        className={clsx(
          'relative flex h-full w-full cursor-pointer flex-col p-4',
          'transition-all duration-300 ease-out',
          'rounded-xl hover:shadow-xl',
        )}
        onClick={() => navigate(urlFor.requestDetail(requestionId))}
      >
        {/* 삭제버튼 */}
        {isWriter && (
          <button
            type="button"
            className={clsx(
              'absolute top-2 right-2 z-50',
              'flex h-7 w-7 items-center justify-center',
              'rounded-full',
              'transition-all duration-200',
              'hover:scale-110 hover:border-red-200 hover:bg-red-50',
              'active:scale-95',
            )}
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
        <div className="relative z-10 mb-3.5 flex items-start gap-3">
          {/* 아바타 */}
          <div className={clsx('h-14 w-14 overflow-hidden rounded-full')}>
            <ProfileImage src={profileImg} alt="profile" />
          </div>

          <div className="mt-1 flex flex-col justify-center">
            <span className={clsx('text-base font-bold text-gray-900')}>{name}</span>
            <div className="mt-1 flex items-center gap-1">
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
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-xs font-medium text-gray-500">{location}</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-1 flex-col gap-2">
          {/* 태그 */}
          <div className="flex flex-wrap gap-2">
            {tagsResult.map((tag, idx) => (
              <Hashtag key={idx} tag={tag} />
            ))}
          </div>

          {/* 요청 내용 */}
          <div
            className={clsx(
              'relative flex-1 rounded-xl p-4',
              'bg-gradient-to-br from-gray-50 to-gray-100/50',
              'border border-gray-200',
              'transition-all duration-300',
              'group-hover:border-gray-300 group-hover:shadow-inner',
            )}
          >
            <p className="line-clamp-3 text-sm leading-relaxed font-medium text-gray-700">
              {content}
            </p>

            {/* 하단 페이드 효과 */}
            <div
              className={clsx(
                'absolute right-0 bottom-0 left-0 h-8',
                'rounded-b-xl bg-gradient-to-t from-gray-100/80 to-transparent',
              )}
            />
          </div>
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      {modalOpen &&
        createPortal(
          <div
            className={clsx(
              'fixed inset-0 z-[9999]',
              'flex h-screen min-h-screen w-screen items-center justify-center',
              'bg-black/60 backdrop-blur-sm',
              'animate-in fade-in duration-200',
            )}
            onClick={(e) => {
              e.stopPropagation();
              setModalOpen(false);
            }}
          >
            <div
              className={clsx(
                'mx-auto my-auto',
                'flex w-[min(92vw,480px)] flex-col',
                'rounded-2xl bg-white p-8 shadow-2xl',
                'animate-in zoom-in-95 duration-200',
                'border border-gray-100',
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 아이콘 */}
              <div className="mb-6 flex justify-center">
                <div
                  className={clsx(
                    'flex h-16 w-16 items-center justify-center',
                    'rounded-full border-4 border-red-100 bg-red-50',
                  )}
                >
                  <svg
                    className="h-8 w-8 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>

              {/* 텍스트 */}
              <div className="mb-8 text-center">
                <h2 className="mb-2 text-2xl font-bold text-gray-900">
                  요청서를 삭제하시겠습니까?
                </h2>
                <p className="text-sm text-gray-500">삭제된 요청서는 복구할 수 없습니다</p>
              </div>

              {/* 버튼 */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  className="bg-gray-300 text-gray-900 transition-all duration-300 hover:bg-gray-400"
                  onClick={() => setModalOpen(false)}
                  width="w-full"
                >
                  취소
                </Button>
                <Button
                  className="transition-all duration-300"
                  onClick={handleDeleteRequest}
                  width="w-full"
                >
                  삭제
                </Button>
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
      <div className="relative flex h-full w-full flex-col p-4">
        {/* 닫기 버튼 */}
        <Skeleton className="absolute top-2 right-2 h-7 w-7 rounded-full" />

        {/* 상단 프로필 */}
        <div className="mb-3.5 flex items-start gap-3">
          <Skeleton className="h-14 w-14 rounded-full" />
          <div className="mt-1 flex flex-col gap-1.5">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-3 w-32 rounded" />
          </div>
        </div>

        {/* 태그 + 내용 */}
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} className="h-7 w-16 rounded-xl" />
            ))}
          </div>
          <Skeleton className="flex-1 rounded-xl" />
        </div>
      </div>
    </Box.Skeleton>
  );
};

RequestCardSkeleton.displayName = 'RequestCard.Skeleton';
RequestCard.Skeleton = RequestCardSkeleton;
export default RequestCard;
