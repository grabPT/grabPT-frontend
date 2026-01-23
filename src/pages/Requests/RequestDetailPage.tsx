import { useEffect, useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '@/components/Button';
import CheckedButton from '@/components/CheckedButton';
import CommentBox from '@/components/CommentBox';
import ProfileImage from '@/components/ProfileImage';
import Tabs, { type TabItem } from '@/components/Tabs';
import ROUTES, { urlFor } from '@/constants/routes';
import { SPORTS } from '@/constants/sports';
import { useGetCanEditRequest } from '@/features/Request/hooks/useGetCanEditRequest';
import { useGetDetailRequest } from '@/features/Request/hooks/useGetDetailRequest';
import { usePatchRequest } from '@/features/Request/hooks/usePatchRequest';
import { patchRequestSchema } from '@/features/Request/schemas/requestSchema';
import type { RequestRequestDto } from '@/features/Request/types/Request';
import { useRoleStore } from '@/store/useRoleStore';
import useScrollStore from '@/store/useScrollStore';
import { useSuggestStore } from '@/store/useSuggestStore';
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

//에러 보여주기 추가할것
const RequestDetailPage = () => {
  const containerRef = useScrollStore((s) => s.containerRef);
  const navigate = useNavigate();
  const { id } = useParams();
  const requestionId = Number(id);
  const { setSuggestInfo } = useSuggestStore();
  const { role } = useRoleStore();
  const [isEditing, setIsEditing] = useState(false);
  //제안서 작성하기 버튼 누를 시 suggestStore의 requestionId를 업데이트하고 suggestFormPage에서 받아쓰기

  // api연결 시 isWriter 함수로 변경 (요청서의 작성자 id === 현재 유저 id)
  const { data: isWriter } = useGetCanEditRequest(requestionId);
  const isEdit = isWriter?.isEdit;

  const TabItems: TabItem[] = [
    { label: '정보', to: urlFor.requestDetail(requestionId) },
    { label: '제안 목록', to: urlFor.requestSuggests(requestionId) },
  ];
  const { data, refetch } = useGetDetailRequest(requestionId);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm<Omit<RequestRequestDto, 'location'>>({
    mode: 'onChange',
    resolver: zodResolver(patchRequestSchema),
    defaultValues: {
      categoryId: 0,
      purpose: [],
      ageGroup: null,
      userGender: '',
      proGender: '',
      startDate: '',
      availableDays: [],
      availableTimes: [],
      content: '',
      etcPurposeContent: '',
      price: 0,
      sessionCount: 0,
    },
  });
  const originalValuesRef = useRef<Omit<RequestRequestDto, 'location'> | null>(null);
  useEffect(() => {
    if (data) {
      reset({
        categoryId: data.categoryId,
        purpose: data.purposes ?? [],
        ageGroup: data.ageGroup ?? null,
        userGender: data.userGender,
        proGender: data.proGender,
        startDate: Array.isArray(data.startDate)
          ? `${data.startDate[0]}-${String(data.startDate[1]).padStart(2, '0')}-${String(data.startDate[2]).padStart(2, '0')}`
          : (data.startDate ?? ''),
        availableDays: data.availableDays ?? [],
        availableTimes: data.availableTimes ?? [],
        content: data.content ?? '',
        etcPurposeContent: data.etcPurposeContent ?? '',
        price: data.requestedPrice ?? 0,
        sessionCount: data.sessionCount ?? 0,
      });
    }
  }, [data, reset]);
  const category = SPORTS.find((s) => s.id === data?.categoryId)?.label;
  // const profileImage = data?.profileImage;
  const navigateToSuggestForm = () => {
    //request 페이지에서 url에 있는 id로 requestionId 업데이트 + 가격+위치 정보 업데이트 -> suggestFormPage에서 store의 저장된 값을 받아서 사용
    setSuggestInfo({
      ...setSuggestInfo,
      requestionId: requestionId,
      price: data?.requestedPrice,
      sessionCount: data?.sessionCount,
    });
    navigate(ROUTES.MATCHING_STATUS.SUGGESTS.NEW);
  };

  const { mutate: editRequest } = usePatchRequest();
  const handleButton = () => {
    if (role === 'PRO') {
      navigateToSuggestForm();
      return;
    } else if (!isEditing) {
      originalValuesRef.current = getValues(); // 현재 값을 저장
      setIsEditing(true);
      containerRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    } else if (isEditing) {
      handleSubmit(
        (formData) => {
          if (isWriter?.isEdit) {
            editRequest(
              {
                requestionId,
                body: {
                  ...formData,
                  location: data?.location ?? '',
                  categoryId: data?.categoryId ?? 0,
                },
              },
              {
                onSuccess: async () => {
                  await refetch();
                  setIsEditing(false);
                },
                onError: async () => {
                  //실패시 롤백
                  if (originalValuesRef.current) {
                    reset(originalValuesRef.current);
                  }
                  await refetch();
                },
              },
            );
          }
        },
        (errors) => {
          const firstError = Object.values(errors)[0];
          if (firstError?.message) {
            alert(firstError.message);
          }
        },
      )();
      containerRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
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
  const trainer = watch('proGender');
  const setTrainerGender = (g: Gender) => setValue('proGender', g);

  /* 가능 요일(다중) */
  const days = watch('availableDays');
  const toggleDay = (d: Day) => {
    const next = days.includes(d) ? days.filter((v) => v !== d) : [...days, d];
    setValue('availableDays', next);
  };
  /* 가능 시간대(다중) */
  const times = watch('availableTimes');
  const toggleTime = (t: TimeSlot) => {
    const next = times.includes(t) ? times.filter((v) => v !== t) : [...times, t];
    setValue('availableTimes', next);
  };
  /* PT 시작 희망일 */
  const startDate = watch('startDate');
  const setStartDate = (v: string) => setValue('startDate', v);

  const togglePurpose = (p: Purpose) => {
    const current = watch('purpose');
    const next = current.includes(p) ? current.filter((v) => v !== p) : [...current, p];
    setValue('purpose', next);
  };

  return (
    <section className="flex flex-col items-center py-6">
      {isWriter?.isEdit ? <Tabs items={TabItems} width="w-[400px]" /> : <div></div>}

      {/* 헤더 */}
      <div className="mt-16 flex h-[50px] w-full items-center justify-center gap-3">
        {/* 프로필 url 이미지로 바꾸는 로직 필요 */}
        <div className="h-[3.125rem] w-[3.125rem] overflow-hidden rounded-full">
          <ProfileImage src={data?.profileImageUrl} alt="요청서 프로필" />
        </div>
        <span className="text-4xl font-extrabold">
          {data?.location?.substring(2)} {data?.userNickname}
          {/* {category} */}
        </span>
        <span className="text-2xl leading-none font-bold"> 님의 요청서입니다.</span>
      </div>

      <section className="mt-20 flex w-[800px] flex-col gap-20 text-4xl font-bold">
        <section>
          <span className="mr-3">{category}</span>
          <span className="text-lg font-semibold">{data?.location}</span>
          {/* 가격 및 횟수 */}
          <div className="mt-5 flex items-end">
            <input
              type="number"
              {...register('sessionCount', {
                valueAsNumber: true,
                setValueAs: (v) => Number(v) || 0,
              })}
              aria-label="희망 PT 횟수"
              className="mr-1.5 h-12 w-[85px] rounded-xl border-2 border-[#BABABA] pl-3.5 text-center text-2xl text-[#9F9F9F]"
              readOnly={!isEdit || !isEditing}
            />

            <span className="mr-5">회</span>
            <input
              type="number"
              {...register('price', { valueAsNumber: true, setValueAs: (v) => Number(v) || 0 })}
              aria-label="희망 PT 가격"
              className="mr-1.5 h-12 w-[260px] rounded-xl border-2 border-[#BABABA] px-8 text-end text-2xl text-[#9F9F9F]"
              readOnly={!isEdit || !isEditing}
            />
            <span className="mr-5">원</span>
            {(errors.price || errors.sessionCount) && (
              <p className="text-[1rem] font-semibold text-red-500">{errors.price?.message}</p>
            )}
          </div>
        </section>

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
                  isChecked={selectedPurposes.includes(p)}
                  onClick={() => togglePurpose(p)}
                  key={p}
                  disabled={!isEdit || !isEditing}
                >
                  {p}
                </CheckedButton>
              ))}
            </div>
            {etcSelected && (
              <textarea
                value={watch('etcPurposeContent')}
                onChange={(e) =>
                  setValue('etcPurposeContent', e.target.value, { shouldDirty: true })
                }
                className="mt-4 h-[180px] w-full resize-none rounded-[10px] border border-[#CCCCCC] bg-[#F5F5F5] p-4 text-[15px] placeholder:text-[#CCCCCC] focus:border-gray-400 focus:outline-none"
                placeholder="세부 내용을 입력해주세요"
                disabled={!isEdit || !isEditing}
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
              <CheckedButton
                key={a}
                isChecked={age === a}
                disabled={!isEdit || !isEditing}
                onClick={() => setAge(a)}
              >
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
                isChecked={studentGender === g}
                onClick={() => setStudentGender(g)}
                disabled={!isEdit || !isEditing}
                key={g}
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
              <span className={errors.proGender ? 'text-red-500' : 'text-button'}>선호 성별</span>
            </h1>
            {errors.proGender && (
              <p className="text-[1rem] font-semibold text-red-500">{errors.proGender.message}</p>
            )}
          </div>
          <div className="mt-6 flex gap-2">
            {GENDERS.map((g) => (
              <CheckedButton
                isChecked={trainer === g}
                onClick={() => setTrainerGender(g)}
                key={g}
                disabled={!isEdit || !isEditing}
              >
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
              <span className={errors.startDate ? 'text-red-500' : 'text-button'}>시작 희망일</span>
            </h1>
            {errors.startDate && (
              <p className="text-[1rem] font-semibold text-red-500">{errors.startDate.message}</p>
            )}
          </div>
          <input
            type="date"
            aria-label="PT 시작 희망일"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            readOnly={!isEdit || !isEditing}
            className="mt-6 rounded-[10px] border border-[#CCCCCC] p-3 text-xl focus:border-gray-400 focus:outline-none"
          />
        </section>

        {/* 6. 가능 요일 */}
        <section>
          <div className="flex items-end gap-3">
            <h1>
              가능
              <span className={errors.availableDays ? 'text-red-500' : 'text-button'}>요일</span>
            </h1>
            {errors.availableDays && (
              <p className="text-[1rem] font-semibold text-red-500">
                {errors.availableDays.message}
              </p>
            )}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {DAYS.map((d) => (
              <CheckedButton
                isChecked={days.includes(d)}
                onClick={() => toggleDay(d)}
                key={d}
                width="w-[56px]"
                disabled={!isEdit || !isEditing}
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
              <CheckedButton
                isChecked={times.includes(t)}
                onClick={() => toggleTime(t)}
                key={t}
                disabled={!isEdit || !isEditing}
              >
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
            readOnly={!isEdit || !isEditing}
            placeholder="추가 요청사항을 입력해주세요"
          />
        </section>
      </section>

      {(role === 'PRO' || isWriter?.isEdit) && (
        <Button width="w-[425px]" className="my-16" onClick={handleButton}>
          {role === 'PRO' ? '제안서 작성' : !isEditing ? '수정하기' : '수정 완료'}
        </Button>
      )}
    </section>
  );
};

export default RequestDetailPage;
