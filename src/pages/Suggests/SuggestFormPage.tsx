import { useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { type FieldErrors, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Profile from '@/assets/images/HeaderProfile.png';
import Button from '@/components/Button';
import CommentBox from '@/components/CommentBox';
import { urlFor } from '@/constants/routes';
import { useGetDetailRequest } from '@/features/Request/hooks/useGetDetailRequest';
import ImageUploader from '@/features/SuggestForm/components/ImageUploader';
import { useSuggest } from '@/features/SuggestForm/hooks/useSuggest';
import { suggestFormSchema } from '@/features/SuggestForm/schemas/suggestFormSchema';
import type { DetailSuggestForm } from '@/features/SuggestForm/types/Suggest';
import useScrollStore from '@/store/useScrollStore';
import { useSuggestStore } from '@/store/useSuggestStore';

const SuggestFormPage = () => {
  const navigate = useNavigate();
  /** 'accept' = 고객 요청 수락, 'custom' = 새로운 가격 제안 */
  const [mode, setMode] = useState<'accept' | 'custom'>('accept');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const containerRef = useScrollStore((s) => s.containerRef);
  //api 연결
  const { mutate: suggestSend } = useSuggest();
  const { suggestInfo, setSuggestInfo } = useSuggestStore();
  //스크롤 설정
  const amountRef = useRef<HTMLDivElement | null>(null);
  const messageRef = useRef<HTMLDivElement | null>(null);
  const locationRef = useRef<HTMLDivElement | null>(null);
  const scrollToError = (errors: FieldErrors<DetailSuggestForm>) => {
    requestAnimationFrame(() => {
      if (errors.price || errors.sessionCount) {
        amountRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (errors.message) {
        messageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
      if (errors.location) {
        locationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  };
  //횟수 가격 숫자 변동 방지용 유틸 함수
  const toSafeInt = (v: unknown) => {
    const n = typeof v === 'number' ? v : Number(v);
    return Number.isFinite(n) ? Math.trunc(n) : undefined;
  };
  const clampMin = (n: number, min: number) => (n < min ? min : n);

  //유효성 검사
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitted },
    setValue,
  } = useForm<DetailSuggestForm>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(suggestFormSchema),
    defaultValues: {
      price: suggestInfo.price,
      message: '',
      sessionCount: suggestInfo.sessionCount,
      location: '',
    },
  });
  const amountErrorMsg = errors.price?.message ?? errors.sessionCount?.message;
  const hasAmountError = Boolean(errors.price || errors.sessionCount);
  const { data: requestInfo } = useGetDetailRequest(
    suggestInfo.requestionId !== null ? suggestInfo.requestionId : 0,
  );

  const onSubmit = async (data: DetailSuggestForm) => {
    const newSuggestInfo = {
      ...data,
      sentAt: new Date().toISOString().split('T')[0],
      isMatched: false,
      requestionId: suggestInfo.requestionId,
    };
    setSuggestInfo(newSuggestInfo);
    if (newSuggestInfo.requestionId !== null) {
      suggestSend(
        {
          data: newSuggestInfo,
          photos: imageFiles,
        },
        {
          onSuccess: (res) => {
            containerRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
            navigate(urlFor.suggestDetail(res.result.suggestionId));
          },
          onError: (err) => {
            console.error('제안서 작성 중 오류가 발생하였습니다.', err);
            containerRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
          },
        },
      );
    }
  };
  return (
    <section
      ref={amountRef}
      className="flex w-full flex-col items-center gap-12 scroll-smooth py-12 text-2xl font-extrabold"
    >
      {/* 헤더 */}
      <div className="flex items-center gap-3">
        <img
          src={requestInfo?.profileImageUrl || Profile}
          alt="요청자 프로필"
          className="h-12 w-12 rounded-full"
        />
        <span className="text-[2.5rem] font-bold">
          {(requestInfo?.location ?? '').split(' ').slice(1).join(' ')}{' '}
          {requestInfo?.userNickname}{' '}
        </span>
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
            {isSubmitted && hasAmountError && (
              <p className="text-[1rem] font-semibold text-red-500">{amountErrorMsg}</p>
            )}
          </div>
          {/* 체크박스 두 개 (상호 배타) */}
          <div className="mt-3.5 flex gap-2">
            <input
              type="radio"
              className="accent-button"
              checked={mode === 'accept'}
              onChange={() => {
                setMode('accept');
                const acceptedPrice = suggestInfo.price;
                const acceptedSessionCount = suggestInfo.sessionCount;
                if (typeof acceptedPrice === 'number') {
                  setValue('price', acceptedPrice, { shouldValidate: true, shouldDirty: true });
                }
                if (typeof acceptedSessionCount === 'number') {
                  setValue('sessionCount', acceptedSessionCount, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }
              }}
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
              {...register('sessionCount', {
                setValueAs: (v) => {
                  if (v === '' || v === null || v === undefined) return undefined;
                  const n = Number(v);
                  return Number.isFinite(n) ? Math.trunc(n) : undefined;
                },
              })}
              className={clsx(
                'mr-1.5 h-12 w-[85px] rounded-xl border-2 border-[#BABABA] pl-3.5 text-center text-2xl font-normal text-[#9F9F9F] disabled:bg-gray-100',
                mode === 'custom' && 'text-black',
              )}
              onBlur={() => {
                const n = toSafeInt(watch('sessionCount'));
                if (n === undefined) return;
                setValue('sessionCount', clampMin(n, 1), {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
            <span className="mr-5">회</span>
            <input
              type="number"
              aria-label="희망 PT 가격"
              readOnly={mode === 'accept'}
              {...register('price', {
                setValueAs: (v) => {
                  if (v === '' || v === null || v === undefined) return undefined;
                  const n = Number(v);
                  return Number.isFinite(n) ? Math.trunc(n) : undefined;
                },
              })}
              className={clsx(
                'mr-1.5 h-12 w-[260px] rounded-xl border-2 border-[#BABABA] px-8 text-end text-2xl font-normal text-[#9F9F9F] disabled:bg-gray-100',
                mode === 'custom' && 'text-black',
              )}
              onBlur={() => {
                const n = toSafeInt(watch('price'));
                if (n === undefined) return;
                // 100 미만은 보정하지 않음 -> 스키마에서 에러
                if (n < 100) {
                  setValue('price', n, { shouldValidate: true, shouldDirty: true });
                  return;
                }
                // 100 이상일 때만 100원 단위 내림
                const fixed = Math.floor(n / 100) * 100;
                setValue('price', fixed, { shouldValidate: true, shouldDirty: true });
              }}
            />
            <span className="mr-5">원</span>
          </div>
        </div>

        {/* 제안 상세설명 */}
        <div ref={messageRef}>
          <div className="flex items-end gap-3">
            <span>
              제안{' '}
              <span className={errors.message ? 'text-red-500' : 'text-button'}>상세 설명</span>
            </span>
            {isSubmitted && errors.message && (
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
        <div ref={locationRef}>
          <div className="flex items-end gap-3">
            <span>
              상세 <span className={errors.location ? 'text-red-500' : 'text-button'}>위치</span>
            </span>
            {isSubmitted && errors.location && (
              <p className="text-[1rem] font-semibold text-red-500">{errors.location.message}</p>
            )}
          </div>
          <textarea
            className="mt-3.5 h-10 w-full resize-none rounded-[10px] border border-[#CCCCCC] bg-[#F5F5F5] px-4 py-2 text-[15px] font-normal placeholder:text-[#CCCCCC] focus:border-gray-400 focus:outline-none"
            placeholder="상세 위치를 입력해주세요."
            value={watch('location') ?? ''}
            onChange={(e) =>
              setValue('location', e.target.value, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
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

      <Button width="w-106" className="mt-30" onClick={handleSubmit(onSubmit, scrollToError)}>
        작성 완료
      </Button>
    </section>
  );
};

export default SuggestFormPage;
