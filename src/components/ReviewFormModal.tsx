import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import Rating from '@mui/material/Rating';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '@/components/Button';
import CommentBox from '@/components/CommentBox';
import { usePostReview } from '@/hooks/usePostReview';

interface IReveiwFormModal {
  proProfileId: number;
  rating: number;
  proName: string;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

type ReviewSchema = {
  content: string;
};

export const ReviewFormModal = ({
  setModalOpen,
  proName,
  proProfileId,
  rating,
}: IReveiwFormModal) => {
  const reviewSchema = z.object({
    content: z.string().max(300, { message: '리뷰는 300자 이하여야 합니다.' }),
  });

  console.log('현재 프로프로필아이디', proProfileId);

  const { handleSubmit, watch, setValue } = useForm<ReviewSchema>({
    mode: 'onChange',
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      content: '',
    },
  });
  const { mutate, isPending } = usePostReview();
  const [rate, setRate] = useState<number | null>(rating ?? 0);
  const [hover, setHover] = useState(-1);
  const pNickname = proName || '전문가';

  const handleClick = handleSubmit((data) => {
    mutate({
      ...data,
      rating: rate ?? 0,
      proProfileId,
    });
  });

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h1 className="text-xl font-semibold">{pNickname}와의 운동은 어땠나요?</h1>

      <div className="flex items-center gap-2">
        <Rating
          value={rate ?? 0}
          precision={0.5}
          max={5}
          sx={{
            fontSize: 30,
            '& .MuiRating-iconFilled': { color: '#E3E32D' },
          }}
          onChange={(_e, newValue) => {
            setRate(newValue);
          }}
          onChangeActive={(_e, newHover) => {
            setHover(newHover);
          }}
        />
        <span className="text-lg font-semibold">{hover !== -1 ? hover : rate}</span>
      </div>

      <CommentBox
        value={watch('content')}
        onChange={(e) => setValue('content', e.target.value, { shouldDirty: true })}
      />
      <div className="flex items-center justify-center gap-3">
        <Button onClick={() => setModalOpen(false)}>닫기</Button>
        <Button onClick={handleClick} disabled={isPending}>
          {isPending ? '작성 중...' : '작성 완료'}
        </Button>
      </div>
    </div>
  );
};
