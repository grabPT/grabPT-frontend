import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import Rating from '@mui/material/Rating';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import Button from '@/components/Button';
import CommentBox from '@/components/CommentBox';
import { usePostReview } from '@/hooks/usePostReview';

interface IReveiwFormModal {
  proId: number;
  rating: number;
  proName: string;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

type ReviewSchema = {
  content: string;
};

export const ReviewFormModal = ({ setModalOpen, proName, proId, rating }: IReveiwFormModal) => {
  const reviewSchema = z.object({
    content: z.string().max(300, { message: '리뷰는 300자 이하여야 합니다.' }),
  });

  const { handleSubmit, watch, setValue } = useForm<ReviewSchema>({
    mode: 'onChange',
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      content: '',
    },
  });
  const { mutate, isPending } = usePostReview();
  const [rate, setRate] = useState<number | null>(rating ?? 0);
  const pNickname = proName || '전문가';

  const submit = handleSubmit((data) => {
    mutate(
      {
        ...data,
        rating: rate ?? 0,
        proId,
      },
      {
        onSuccess: () => {
          toast.success('리뷰 작성이 완료되었습니다');
          setModalOpen(false);
        },
        onError: () => {
          alert('리뷰 작성에 실패했습니다');
        },
      },
    );
  });

  const handleClick = (action: 'submit' | 'close') => {
    if (action === 'close') {
      setModalOpen(false);
      return;
    }
    submit();
  };

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-[28px] shadow-2xl">
      {/* Header with gradient background */}
      <div className="relative bg-gradient-to-br from-[#173df1] to-[#1231c1] px-10 py-12 text-center">
        {/* Decorative background effect */}
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-[20%] h-32 w-32 rounded-full bg-white blur-3xl" />
          <div className="absolute top-1/2 right-[20%] h-32 w-32 rounded-full bg-white blur-3xl" />
        </div>
        <button
          onClick={() => handleClick('close')}
          className="absolute top-5 right-5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white/95 text-sm text-gray-600 backdrop-blur-sm transition-all hover:scale-105 hover:bg-white"
          aria-label="닫기"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="mb-2 text-2xl leading-snug font-bold text-white">
          {pNickname}와의
          <br />
          운동은 어땠나요?
        </h2>
        <p className="text-m text-white/95">솔직한 후기를 남겨주세요</p>
      </div>

      {/* Body */}
      <div className="bg-white px-10 py-10">
        {/* Stars Section */}
        <div className="mb-8 flex justify-center">
          <Rating
            value={rate ?? 0}
            precision={0.5}
            max={5}
            size="large"
            sx={{
              fontSize: 48,
            }}
            onChange={(_e, newValue) => {
              setRate(newValue);
            }}
          />
        </div>
        {/* Textarea */}
        <div className="mb-6">
          <CommentBox
            value={watch('content')}
            max={300}
            onChange={(e) => setValue('content', e.target.value, { shouldDirty: true })}
            placeholder="내용을 입력해주세요"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={() => handleClick('close')}
            className="flex-1 rounded-[14px] bg-gray-300 px-7 py-4 text-base font-semibold text-gray-900 transition-all duration-300 hover:bg-gray-400"
          >
            닫기
          </Button>
          <Button
            onClick={() => {
              handleClick('submit');
            }}
            disabled={isPending || !rate}
            className="flex-1 rounded-[14px] bg-gradient-to-br from-[#173df1] to-[#1231c1] px-7 py-4 text-base font-semibold text-white shadow-[0_4px_16px_rgba(23,61,241,0.3)] transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_8px_24px_rgba(23,61,241,0.4)] active:translate-y-0 disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? '작성 중...' : '작성 완료'}
          </Button>
        </div>
      </div>
    </div>
  );
};
