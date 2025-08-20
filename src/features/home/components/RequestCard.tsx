import { useState } from 'react';

import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button';
import { ReviewFormModal } from '@/components/ReviewFormModal';
import { urlFor } from '@/constants/routes';
import UserRequestHeader from '@/features/Requests/components/UserRequestHeader';
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
}

const RequestCardInMain = ({
  name,
  location,
  tags,
  text,
  id,
  profileImg,
  isMatched,
}: RequestCardInMainProps) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const daysPerWeek = `주 ${tags.daysPerWeek}회`;
  const tagsResult = [
    ...tags.categoryName.split(' '),
    ...tags.availableTimes.map((time) => TIME_SLOT_LABELS[time]),
    daysPerWeek,
  ];
  return (
    <div
      onClick={() => navigate(urlFor.requestDetail(id))}
      className="flex h-[220px] max-w-[340px] cursor-pointer flex-col gap-[12px] rounded-xl px-[10px] py-[15px] shadow-[4px_4px_10px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:scale-[1.02] lg:w-[320px] xl:w-[320px] 2xl:w-[340px]"
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
      <div className="h-[100px] w-full rounded-md border border-blue-600/10 bg-[#f0f7ff]">
        <p
          className={clsx(
            'p-1.5 text-[12px] text-[#525252]',
            isMatched ? 'line-clamp-1' : 'line-clamp-3',
          )}
        >
          {text}
        </p>
      </div>
      {isMatched && (
        <Button onClick={() => setModalOpen(true)} width="280px">
          리뷰 작성하기
        </Button>
      )}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40"
          onClick={(e) => {
            e.stopPropagation();
            setModalOpen(false);
          }}
        >
          <div
            className="w-[min(92vw,520px)] rounded-xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold">리뷰 작성</h3>
              <Button
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                닫기
              </Button>
            </div>
            <ReviewFormModal proName={name ?? '전문가'} proProfileId={id} rating={0} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestCardInMain;
