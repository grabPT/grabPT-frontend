import { useEffect, useState } from 'react';

import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button';
import { ReviewFormModal } from '@/components/ReviewFormModal';
import { urlFor } from '@/constants/routes';
import UserRequestHeader from '@/features/Requests/components/UserRequestHeader';
import { useRoleStore } from '@/store/useRoleStore';
import { TIME_SLOT_LABELS } from '@/types/ReqeustsType';
import type { Tags } from '@/types/Tags';

import Hashtag from './Hashtag';

interface RequestCardInMainProps {
  name?: string;
  location: string;
  tags: Tags;
  text: string;
  id: number;
  profileImg?: string;
  isMatched: boolean;
  proProfileId?: number;
  proNickname?: string;
  canWriteReview?: boolean;
}

const RequestCardInMain = ({
  name,
  location,
  tags,
  text,
  id,
  profileImg,
  proProfileId,
  isMatched,
  proNickname,
  canWriteReview,
}: RequestCardInMainProps) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const { role } = useRoleStore();
  const isPro = role === 'PRO';
  useEffect(() => {
    const { body } = document;
    if (!body) return;
    const previous = body.style.overflow;
    if (modalOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = previous || '';
    }
    return () => {
      body.style.overflow = previous || '';
    };
  }, [modalOpen]);

  const daysPerWeek = `주 ${tags.daysPerWeek}회`;
  const tagsResult = [
    ...tags.categoryName.split(' '),
    ...tags.availableTimes.map((time) => TIME_SLOT_LABELS[time]),
    daysPerWeek,
  ];
  return (
    <div
      onClick={() => navigate(urlFor.requestDetail(id))}
      className={clsx(
        'flex h-[340px] max-w-[340px] cursor-pointer flex-col gap-[12px] rounded-xl px-[10px] py-[15px] shadow-[4px_4px_10px_rgba(0,0,0,0.25)] lg:w-[320px] xl:w-[320px] 2xl:w-[340px]',
        !modalOpen && 'transition-transform duration-200 hover:scale-[1.02]',
      )}
    >
      <div className="flex items-center justify-end">
        <div
          className={clsx(
            'h-[13px] w-[13px] rounded-full',
            isMatched ? 'bg-[#4CAF50]' : 'bg-[#FF8A00]',
          )}
        />
        {/* 상태 텍스트 */}
        <p className="font-pretendard ml-[6px] text-[12px] leading-[16.8px] font-medium text-[#000]">
          {isMatched ? '매칭 성공' : '대기중'}
        </p>
      </div>
      <UserRequestHeader nickName={name} location={location} profileImg={profileImg} />
      <div className="flex flex-wrap gap-[6px]">
        {tagsResult.map((tag, idx) => (
          <Hashtag key={idx} tag={tag} />
        ))}
      </div>
      <div
        className={clsx(
          'w-full rounded-md border border-blue-600/10 bg-[#f0f7ff]',
          canWriteReview && !isPro ? 'h-[140px]' : 'h-[200px]',
        )}
      >
        <p
          className={clsx(
            'p-1.5 text-[12px] text-[#525252]',
            canWriteReview && !isPro ? 'line-clamp-4' : 'line-clamp-6',
          )}
        >
          {text}
        </p>
      </div>
      {canWriteReview && !isPro && (
        <Button
          className="z-10"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setModalOpen(true);
          }}
          width="280px"
        >
          리뷰 작성하기
        </Button>
      )}
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
              <h3 className="mr-auto mb-3 text-lg font-semibold">리뷰 작성</h3>
              <ReviewFormModal
                proName={proNickname ?? '전문가'}
                proProfileId={proProfileId || 999}
                rating={0}
                setModalOpen={setModalOpen}
              />
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default RequestCardInMain;
