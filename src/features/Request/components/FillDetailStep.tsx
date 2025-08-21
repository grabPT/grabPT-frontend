import { type ForwardRefRenderFunction, forwardRef, useImperativeHandle } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import CheckedButton from '@/components/CheckedButton';
import CommentBox from '@/components/CommentBox';
import { useGetCanEditRequest } from '@/features/Request/hooks/useGetCanEditRequest';
import { detailInfoSchema } from '@/features/Request/schemas/requestSchema';
import type { RequestDetailStepDto } from '@/features/Request/types/Request';
import { useRequestStore } from '@/store/useRequestStore';
import {
  AGES,
  type AgeGroup,
  DAYS,
  type Day,
  GENDERS,
  type Gender,
  PURPOSES,
  type Purpose,
  TIMES,
  type TimeSlot,
} from '@/types/ReqeustsType';

const FillDetailStep: ForwardRefRenderFunction<{ submit: () => Promise<boolean> }, object> = (
  _props,
  ref,
) => {
  const { detailInfo, setDetailInfo } = useRequestStore();
  const { id } = useParams<{ id: string }>();
  const { data: isWriter } = useGetCanEditRequest(Number(id));
  const canEdit = isWriter?.canEdit;
  //유효성 검사
  const {
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RequestDetailStepDto>({
    mode: 'onChange',
    resolver: zodResolver(detailInfoSchema),
    defaultValues: {
      purpose: detailInfo.purpose ?? [],
      ageGroup: detailInfo.ageGroup ?? null,
      userGender: detailInfo.userGender ?? '',
      trainerGender: detailInfo.trainerGender ?? '',
      startPreference: detailInfo.startPreference ?? '',
      availableDays: detailInfo.availableDays ?? [],
      availableTimes: detailInfo.availableTimes ?? [],
      content: detailInfo.content ?? '',
      etcPurposeContent: detailInfo.etcPurposeContent ?? '',
    },
  });
  console.log(errors);

  useImperativeHandle(ref, () => ({
    submit: () =>
      new Promise((resolve) => {
        handleSubmit(
          async (data) => {
            const updated = {
              ...data,
              etcPurposeContent: data.purpose.includes('기타') ? data.etcPurposeContent : undefined,
            };
            setDetailInfo(updated);
            console.log('updated:', updated);
            resolve(true);
          },
          () => {
            resolve(false); // 유효성 검증 실패 시 false 반환
          },
        )();
      }),
  }));

  /* 목적(다중) */
  const selectedPurposes = watch('purpose');
  //기타 포함 시 입력창 보임
  const etcSelected = selectedPurposes.includes('기타');

  /* 연령대(단일) */
  const age = watch('ageGroup');
  const setAge = (a: AgeGroup) => setValue('ageGroup', a);

  /* 수강생 성별(단일) */
  const studentGender = watch('userGender');
  const setStudentGender = (g: Gender) => setValue('userGender', g);

  /* 트레이너 선호 성별(단일) */
  const trainer = watch('trainerGender');
  const setTrainerGender = (g: Gender) => setValue('trainerGender', g);

  /* 가능 요일(다중) */
  const days = watch('availableDays');
  const toggleDay = (d: Day) => {
    if (!canEdit) return;
    const next = days.includes(d) ? days.filter((v) => v !== d) : [...days, d];
    setValue('availableDays', next);
  };
  /* 가능 시간대(다중) */
  const times = watch('availableTimes');
  const toggleTime = (t: TimeSlot) => {
    if (!canEdit) return;
    const next = times.includes(t) ? times.filter((v) => v !== t) : [...times, t];
    setValue('availableTimes', next);
  };
  /* PT 시작 희망일 */
  const startDate = watch('startPreference');
  const setStartDate = (v: string) => {
    if (!canEdit) return;
    setValue('startPreference', v);
  };

  const togglePurpose = (p: Purpose) => {
    if (!canEdit) return;
    const current = watch('purpose');
    const next = current.includes(p) ? current.filter((v) => v !== p) : [...current, p];
    setValue('purpose', next);
  };

  return (
    <div className="flex w-full flex-col gap-20 text-left text-4xl font-bold">
      {/* 1. PT 목적 */}
      <section>
        <div className="flex items-end gap-3">
          <h1>
            PT의 <span className={errors.purpose ? 'text-red-500' : 'text-button'}>목적</span>이
            무엇인가요?
          </h1>
          {errors.purpose && (
            <p className="text-[1rem] font-semibold text-red-500">{errors.purpose.message}</p>
          )}
        </div>
        <div className="mt-6">
          <div className="flex gap-6">
            {PURPOSES.map((p) => (
              <CheckedButton
                key={p}
                isChecked={selectedPurposes.includes(p)}
                onClick={() => togglePurpose(p)}
                disabled={!canEdit}
              >
                {p}
              </CheckedButton>
            ))}
          </div>
          {etcSelected && (
            <textarea
              value={watch('etcPurposeContent')}
              onChange={(e) => setValue('etcPurposeContent', e.target.value, { shouldDirty: true })}
              className="mt-4 h-[180px] w-full resize-none rounded-[10px] border border-[#CCCCCC] bg-[#F5F5F5] p-4 text-[15px] placeholder:text-[#CCCCCC] focus:border-gray-400 focus:outline-none"
              placeholder="세부 내용을 입력해주세요"
              readOnly={!canEdit}
            />
          )}
        </div>
      </section>

      {/* 2. 연령대 */}
      <section>
        <div className="flex items-end gap-3">
          <h1>
            수강생의{' '}
            <span className={errors.ageGroup ? 'text-red-500' : 'text-button'}>연령대</span>
          </h1>
          {errors.ageGroup && (
            <p className="text-[1rem] font-semibold text-red-500">{errors.ageGroup.message}</p>
          )}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {AGES.map((a) => (
            <CheckedButton key={a} isChecked={age === a} onClick={() => setAge(a)}>
              {a}
            </CheckedButton>
          ))}
        </div>
      </section>

      {/* 3. 수강생 성별 */}
      <section>
        <div className="flex items-end gap-3">
          <h1>
            수강생의{' '}
            <span className={errors.userGender ? 'text-red-500' : 'text-button'}>성별</span>
          </h1>
          {errors.userGender && (
            <p className="text-[1rem] font-semibold text-red-500">{errors.userGender.message}</p>
          )}
        </div>

        <div className="mt-6 flex gap-2">
          {GENDERS.map((g) => (
            <CheckedButton
              key={g}
              isChecked={studentGender === g}
              onClick={() => setStudentGender(g)}
            >
              {g}
            </CheckedButton>
          ))}
        </div>
      </section>

      {/* 4. 트레이너 선호 성별 */}
      <section>
        <div className="flex items-end gap-3">
          <h1>
            트레이너{' '}
            <span className={errors.trainerGender ? 'text-red-500' : 'text-button'}>선호 성별</span>
          </h1>
          {errors.trainerGender && (
            <p className="text-[1rem] font-semibold text-red-500">{errors.trainerGender.message}</p>
          )}
        </div>
        <div className="mt-6 flex gap-2">
          {GENDERS.map((g) => (
            <CheckedButton key={g} isChecked={trainer === g} onClick={() => setTrainerGender(g)}>
              {g}
            </CheckedButton>
          ))}
        </div>
      </section>

      {/* 5. PT 시작 희망일 */}
      <section>
        <div className="flex items-end gap-3">
          <h1>
            PT{' '}
            <span className={errors.startPreference ? 'text-red-500' : 'text-button'}>
              시작 희망일
            </span>
          </h1>
          {errors.startPreference && (
            <p className="text-[1rem] font-semibold text-red-500">
              {errors.startPreference.message}
            </p>
          )}
        </div>
        <input
          type="date"
          aria-label="PT 시작 희망일"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          disabled={!canEdit}
          className="mt-6 rounded-[10px] border border-[#CCCCCC] p-3 text-xl focus:border-gray-400 focus:outline-none"
        />
      </section>

      {/* 6. 가능 요일 */}
      <section>
        <div className="flex items-end gap-3">
          <h1>
            가능<span className={errors.availableDays ? 'text-red-500' : 'text-button'}>요일</span>
          </h1>
          {errors.availableDays && (
            <p className="text-[1rem] font-semibold text-red-500">{errors.availableDays.message}</p>
          )}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {DAYS.map((d) => (
            <CheckedButton
              key={d}
              width="w-[56px]"
              isChecked={days.includes(d)}
              onClick={() => toggleDay(d)}
            >
              {d}
            </CheckedButton>
          ))}
        </div>
      </section>

      {/* 7. 가능 시간대 */}
      <section>
        <div className="flex items-end gap-3">
          <h1>
            가능
            <span className={errors.availableTimes ? 'text-red-500' : 'text-button'}>시간대</span>
          </h1>
          {errors.availableTimes && (
            <p className="text-[1rem] font-semibold text-red-500">
              {errors.availableTimes.message}
            </p>
          )}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {TIMES.map((t) => (
            <CheckedButton key={t} isChecked={times.includes(t)} onClick={() => toggleTime(t)}>
              {t}
            </CheckedButton>
          ))}
        </div>
      </section>

      {/* 8. 세부 요청사항 */}
      <section>
        <h1>
          세부 <span className="text-button">요청사항</span>
        </h1>
        <CommentBox
          value={watch('content')}
          onChange={(e) => setValue('content', e.target.value, { shouldDirty: true })}
          readOnly={!canEdit}
        />
      </section>
    </div>
  );
};

export default forwardRef(FillDetailStep);
