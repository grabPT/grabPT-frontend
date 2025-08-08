import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';

import Profile from '@/assets/images/HeaderProfile.png';
import Button from '@/components/Button';
import CommentBox from '@/components/CommentBox';
import ImageUploader from '@/features/ProposalForm/components/ImageUploader';
import { useSuggest } from '@/features/ProposalForm/hooks/useSuggest';
import { proposalFormSchema } from '@/features/ProposalForm/schemas/proposalFormSchema';
import type { DetailProposalForm } from '@/features/ProposalForm/types/Suggest';
import { useSuggestStore } from '@/store/useSuggestStore';

const ProposalFormPage = () => {
  /** 'accept' = 고객 요청 수락, 'custom' = 새로운 가격 제안 */
  const [mode, setMode] = useState<'accept' | 'custom'>('accept');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  //api 연결
  const { mutate: suggestSend } = useSuggest();
  const { suggestInfo, setSuggestInfo } = useSuggestStore();

  //유효성 검사
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<DetailProposalForm>({
    mode: 'onChange',
    resolver: zodResolver(proposalFormSchema),
    defaultValues: {
      price: suggestInfo.price,
      message: '',
      sessionCount: suggestInfo.sessionCount,
      location: '',
    },
  });
  console.log(errors);
  const onSubmit = async (data: DetailProposalForm) => {
    const newSuggestInfo = {
      ...data,
      sentAt: new Date().toISOString(),
      isAgreed: false,
      requestionId: suggestInfo.requestionId,
    };
    setSuggestInfo(newSuggestInfo);
    console.log('requestionId', suggestInfo.requestionId);
    if (newSuggestInfo.requestionId !== null) {
      try {
        await suggestSend({
          data: newSuggestInfo,
          photos: imageFiles,
        });
      } catch (err) {
        console.error('Suggest failed:', err);
      }
    }
  };
  const amountErrorMsg = errors.price?.message ?? errors.sessionCount?.message;
  const hasAmountError = Boolean(errors.price || errors.sessionCount);
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
          <div className="flex items-end gap-3">
            <span>
              고객{' '}
              <span className={hasAmountError ? 'text-red-500' : 'text-button'}>요청 금액</span>
            </span>
            {hasAmountError && (
              <p className="text-[1rem] font-semibold text-red-500">{amountErrorMsg}</p>
            )}
          </div>
          {/* 체크박스 두 개 (상호 배타) */}
          <div className="mt-3.5 flex gap-2">
            <input
              type="radio"
              className="accent-button"
              checked={mode === 'accept'}
              onChange={() => setMode('accept')}
              aria-label="고객 요청 수락"
            />
            <span className="mr-3 text-base font-medium">고객 요청 수락</span>

            <input
              type="radio"
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
              readOnly={mode === 'accept'}
              {...register('sessionCount', { valueAsNumber: true })}
              className={clsx(
                'mr-1.5 h-12 w-[85px] rounded-xl border-2 border-[#BABABA] pl-3.5 text-center text-2xl font-normal text-[#9F9F9F] disabled:bg-gray-100',
                mode === 'custom' && 'text-black',
              )}
            />
            <span className="mr-5">회</span>
            <input
              type="number"
              aria-label="희망 PT 가격"
              readOnly={mode === 'accept'}
              {...register('price', { valueAsNumber: true })}
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
          <div className="flex gap-3">
            <span>
              제안{' '}
              <span className={errors.message ? 'text-red-500' : 'text-button'}>상세 설명</span>
            </span>
            {errors.message && (
              <p className="text-[1rem] font-semibold text-red-500">{errors.message.message}</p>
            )}
          </div>
          <CommentBox
            value={watch('message') ?? ''}
            onChange={(e) =>
              setValue('message', e.target.value, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          />
        </div>

        {/* 상세 위치 */}
        <div>
          <div className="flex gap-3">
            <span>
              상세 <span className={errors.location ? 'text-red-500' : 'text-button'}>위치</span>
            </span>
            {errors.location && (
              <p className="text-[1rem] font-semibold text-red-500">{errors.location.message}</p>
            )}
          </div>
          <textarea
            className="mt-3.5 h-10 w-full resize-none rounded-[10px] border border-[#CCCCCC] bg-[#F5F5F5] px-4 py-2 text-[15px] font-normal placeholder:text-[#CCCCCC] focus:border-gray-400 focus:outline-none"
            placeholder="상세 위치를 입력해주세요."
            {...register('location')}
          />
        </div>

        {/* 사진 첨부 */}
        <div>
          <span>
            <span className="text-button">사진</span> 첨부
          </span>
          <ImageUploader onChange={(files) => setImageFiles(files)} />
        </div>
      </div>

      <Button width="w-106" className="mt-30" onClick={handleSubmit(onSubmit)}>
        작성 완료
      </Button>
    </section>
  );
};

export default ProposalFormPage;
