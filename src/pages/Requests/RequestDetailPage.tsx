import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import z from 'zod';

import Profile from '@/assets/images/HeaderProfile.png';
import Button from '@/components/Button';
import CheckedButton from '@/components/CheckedButton';
import Tabs, { type TabItem } from '@/components/Tabs';
import ROUTES, { urlFor } from '@/constants/routes';
import { useSuggestStore } from '@/store/useSuggestStore';
import { useUserRoleStore } from '@/store/useUserRoleStore';
import { AGES, DAYS, GENDERS, PURPOSES, TIMES } from '@/types/ReqeustsType';
import { useRequestDetail } from '@/features/Request/hooks/useGetDetailRequest';
import { mapEGenderToEnum } from '@/types/ReqeustsType';

const RequestDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const requestionId = Number(id);
  const { setSuggestInfo } = useSuggestStore();
  const { isExpert } = useUserRoleStore();

  // const category = SPORTS.find((s) => s.id === data?.categoryId);

  // api연결 시 isWriter 함수로 변경 (요청서의 작성자 id === 현재 유저 id)
  const [isWriter] = useState<boolean>(false);
  const TabItems: TabItem[] = [
    { label: '정보', to: urlFor.requestDetail(requestionId) },
    { label: '제안 목록', to: urlFor.requestProposals(requestionId) },
  ];
  const {data, isLoading, isError} = useRequestDetail(requestionId);


  const editRequest = () => alert('ㄴㄴ아직 ㅋㅋ');
  const navigateToProposalForm = () => {
    //request 페이지에서 url에 있는 id로 requestionId 업데이트 + 가격+위치 정보 업데이트 -> proposalFormPage에서 store의 저장된 값을 받아서 사용
    setSuggestInfo({ ...setSuggestInfo, requestionId });
    navigate(ROUTES.PROPOSALS.NEW);
  };

  const handleButton = () => {
    if (isWriter) editRequest();
    else navigateToProposalForm();
  };

  try {
    
    // 검증 통과 → 제출 가능
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err); // 각 필드별 에러 메시지 접근 가능
      alert(err.message); // 첫 번째 에러 메시지 alert
    }
  }
  return (
    <section className="flex flex-col items-center py-6">
      {isWriter && <Tabs items={TabItems} width="w-[400px]" />}

      {/* 헤더 */}
      <div className="mt-16 flex h-[50px] w-full items-center justify-center gap-3">
        <img src={Profile} alt="요청서 프로필" className="h-full" />
        {/* 강서구 복서 -> 회원 닉네임으로 바꿔야 할 듯, 아니면 복서라는 단어를 모든 종목마다 따로 설정해야함 */}
        <span className="text-4xl font-extrabold">
          {data?.location}
           {/* {category?.label} */}
        </span>
        <span className="text-2xl leading-none font-bold"> 님의 요청서입니다.</span>
      </div>

      <section className="mt-20 flex w-full flex-col gap-20 text-4xl font-bold">
        <section>
          <span className="mr-3">복싱</span>
          <span className="text-lg font-semibold">{data?.location}</span>

          <div className="mt-5 flex items-center">
            <input
              type="number"
              value={data?.sessionCount}
              aria-label="희망 PT 횟수"
              readOnly
              className="mr-1.5 h-12 w-[85px] rounded-xl border-2 border-[#BABABA] pl-3.5 text-center text-2xl text-[#9F9F9F]"
            />
            <span className="mr-5">회</span>
            <input
              type="number"
              value={data?.price}
              aria-label="희망 PT 가격"
              readOnly
              className="mr-1.5 h-12 w-[260px] rounded-xl border-2 border-[#BABABA] px-8 text-end text-2xl text-[#9F9F9F]"
            />
            <span className="mr-5">원</span>
          </div>
        </section>

        {/* 1. PT 목적 */}
        <section className="">
          <h1>
            PT의 <span className="text-button">목적</span>이 무엇인가요?
          </h1>
          <div className="mt-6">
            <div className="flex gap-6">
              {PURPOSES.map((p) => (
                <CheckedButton isChecked={(data?.purpose ?? []).includes(p)} key={p}>{p}</CheckedButton>
              ))}
            </div>
               {/* 타입 고치고 나서 추가 예정 {data.etcPurposeContent && ( */}
            <textarea
              className="mt-4 h-[180px] w-full resize-none rounded-[10px] border border-[#CCCCCC] bg-[#F5F5F5] p-4 text-[15px] placeholder:text-[#CCCCCC] focus:border-gray-400 focus:outline-none"
              placeholder="세부 내용을 입력해주세요"
            />
          </div>
        </section>

        {/* 2. 연령대 */}
        <section>
          <h1>
            수강생의 <span className="text-button">연령대</span>
          </h1>
          <div className="mt-6 flex flex-wrap gap-2">
            {AGES.map((a) => (
              <CheckedButton
                isChecked={data?.ageGroup === a}
                key={a}
                onClick={() => {
                  //  disabled={!canEdit}
                  // setValue('ageGroup', a, { shouldDirty: true, shouldValidate: true });
                }}
              >
                {a}
              </CheckedButton>
            ))}
          </div>
        </section>

        {/* 3. 수강생 성별 */}
        <section>
          <h1>
            수강생의 <span className="text-button">성별</span>
          </h1>
          <div className="mt-6 flex gap-2">
            {GENDERS.map((g) => (
              <CheckedButton   isChecked={mapEGenderToEnum(data?.userGender ?? '') === g} key={g}>{g}</CheckedButton>
            ))}
          </div>
        </section>

        {/* 4. 트레이너 선호 성별 */}
        <section>
          <h1>
            트레이너 <span className="text-button">선호 성별</span>
          </h1>
          <div className="mt-6 flex gap-2">
            {GENDERS.map((g) => (
              <CheckedButton isChecked={mapEGenderToEnum(data?.trainerGender ?? '') === g} key={g}>{g}</CheckedButton>
            ))}
          </div>
        </section>

        {/* 5. PT 시작 희망일 */}
        <section>
          <h1>
            PT <span className="text-button">시작 희망일</span>
          </h1>
          <input
            type="date"
            aria-label="PT 시작 희망일"
            value={data?.startPreference}
            className="mt-6 rounded-[10px] border border-[#CCCCCC] p-3 text-xl focus:border-gray-400 focus:outline-none"
          />
        </section>

        {/* 6. 가능 요일 */}
        <section>
          <h1>
            가능 <span className="text-button">요일</span>
          </h1>
          <div className="mt-6 flex flex-wrap gap-2">
            {DAYS.map((d) => (
              <CheckedButton isChecked={data?.availableDays.includes(d)} key={d} width="w-[56px]">
                {d}
              </CheckedButton>
            ))}
          </div>
        </section>

        {/* 7. 가능 시간대 */}
        <section>
          <h1>
            가능 <span className="text-button">시간대</span>
          </h1>
          <div className="mt-6 flex flex-wrap gap-2">
            {TIMES.map((t) => (
              <CheckedButton isChecked={data?.availableTimes.includes(t)} key={t}>{t}</CheckedButton>
            ))}
          </div>
        </section>

        {/* 8. 세부 요청사항 */}
        <section>
          <h1>
            세부 <span className="text-button">요청사항</span>
          </h1>
          <textarea
            className="mt-6 h-[433px] w-full resize-none rounded-[10px] border border-[#CCCCCC] bg-[#F5F5F5] p-4 text-[15px] placeholder:text-[#CCCCCC] focus:border-gray-400 focus:outline-none"
            placeholder={'입력받아서 넘겨요 ~'}
            // value={data?.content}
          />
        </section>
      </section>

      {(isExpert || isWriter) && (
        <Button width="w-[425px]" className="mt-28" onClick={handleButton}>
          {isExpert ? '제안서 작성' : '수정하기'}
        </Button>
      )}
    </section>
  );
};

export default RequestDetailPage;
