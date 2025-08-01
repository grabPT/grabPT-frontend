import { useState } from 'react';

import clsx from 'clsx';

import Profile from '@/assets/images/HeaderProfile.png';
import Button from '@/components/Button';
import CommentBox from '@/components/CommentBox';
import ImageUploader from '@/features/ProposalForm/components/ImageUploader';

const ProposalFormPage = () => {
  /** 'accept' = 고객 요청 수락, 'custom' = 새로운 가격 제안 */
  const [mode, setMode] = useState<'accept' | 'custom'>('accept');
  const [count, setCount] = useState(10);
  const [price, setPrice] = useState(480_000);

  return (
    <section className="flex w-full flex-col items-center gap-12 py-12 text-2xl font-extrabold">
      {/* 헤더 */}
      <div className="flex items-center gap-3">
        <img src={Profile} alt="요청자 프로필" className="h-12" />
        <span className="text-[2.5rem] font-bold">강서구 복서</span>
        <span className="text-2xl font-semibold">고객에게 제안서 작성</span>
      </div>

      <div className="flex w-full flex-col gap-12">
        {/* 고객 요청 금액 */}
        <div>
          <span>
            고객 <span className="text-button">요청 금액</span>
          </span>

          {/* 체크박스 두 개 (상호 배타) */}
          <div className="mt-3.5 flex gap-2">
            <input
              type="checkbox"
              className="accent-button"
              checked={mode === 'accept'}
              onChange={() => setMode('accept')}
              aria-label="고객 요청 수락"
            />
            <span className="mr-3 text-base font-medium">고객 요청 수락</span>

            <input
              type="checkbox"
              className="accent-button"
              checked={mode === 'custom'}
              onChange={() => setMode('custom')}
              aria-label="새로운 가격 제안"
            />
            <span className="text-base font-medium">새로운 가격 제안</span>
          </div>

          {/* 횟수·가격 입력 */}
          <div className="mt-3.5 flex items-center">
            <input
              type="number"
              aria-label="희망 PT 횟수"
              value={count}
              readOnly={mode === 'accept'}
              onChange={(e) => setCount(+e.target.value)}
              className={clsx(
                'mr-1.5 h-12 w-[85px] rounded-xl border-2 border-[#BABABA] pl-3.5 text-center text-2xl font-normal text-[#9F9F9F] disabled:bg-gray-100',
                mode === 'custom' && 'text-black',
              )}
            />
            <span className="mr-5">회</span>

            <input
              type="number"
              aria-label="희망 PT 가격"
              value={price}
              readOnly={mode === 'accept'}
              onChange={(e) => setPrice(+e.target.value)}
              className={clsx(
                'mr-1.5 h-12 w-[260px] rounded-xl border-2 border-[#BABABA] px-8 text-end text-2xl font-normal text-[#9F9F9F] disabled:bg-gray-100',
                mode === 'custom' && 'text-black',
              )}
            />
            <span className="mr-5">원</span>
          </div>
        </div>

        {/* 제안 상세설명 */}
        <div>
          <span>
            제안 <span className="text-button">상세 설명</span>
          </span>
          <CommentBox />
        </div>

        {/* 상세 위치 */}
        <div>
          <span>
            상세 <span className="text-button">위치</span>
          </span>
          <textarea
            className="mt-3.5 h-10 w-full resize-none rounded-[10px] border border-[#CCCCCC] bg-[#F5F5F5] px-4 py-2 text-[15px] font-normal placeholder:text-[#CCCCCC] focus:border-gray-400 focus:outline-none"
            placeholder="상세 위치를 입력해주세요."
          />
        </div>

        {/* 사진 첨부 */}
        <div>
          <span>
            <span className="text-button">사진</span> 첨부
          </span>
          <ImageUploader />
        </div>
      </div>

      <Button width="w-106" className="mt-30">
        작성 완료
      </Button>
    </section>
  );
};

export default ProposalFormPage;
