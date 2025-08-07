import { useCallback, useRef } from 'react';
import React from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button';
import Stepper from '@/components/Stepper';
import { urlFor } from '@/constants/routes';
import FillDetailStep from '@/features/Request/components/FillDetailStep';
import SelectPriceStep from '@/features/Request/components/SelectPriceStep';
import SelectSportStep from '@/features/Request/components/SelectSportStep';
import useStepParam from '@/features/Request/hooks/UseStepParam';
import { usePostRequest } from '@/features/Request/hooks/usePostRequest';
import { useRequestStore } from '@/store/useRequestStore';

type FillDetailRef = { submit: () => Promise<boolean> };
const STEP_MAP = {
  1: SelectSportStep,
  2: SelectPriceStep,
  3: FillDetailStep,
} as const;

type StepComponentType =
  | (typeof STEP_MAP)[1]
  | (typeof STEP_MAP)[2]
  | React.ForwardRefExoticComponent<React.RefAttributes<FillDetailRef>>;

const RequestFormPage = () => {
  const navigate = useNavigate();
  /* step 관리 훅 */
  const { step, next, isLast } = useStepParam(3);

  const StepComponent = STEP_MAP[step] as StepComponentType;
  const fillDetailRef = useRef<{ submit: () => Promise<boolean> }>(null);

  //api 연결 + 유효성 검사
  const { mutateAsync: requestSend } = usePostRequest();
  const { sportsTypeInfo } = useRequestStore();

  const handleNext = useCallback(async () => {
    if (step === 1) {
      if (sportsTypeInfo?.categoryId == 0) {
        alert('운동 종목을 선택해주세요');
        return;
      }
    }
    if (isLast) {
      //외부(RequestPage.tsx)에서 내부(FillDetailStep.tsx) 컴포넌트의 onSubmit 함수를 호출하여 폼검사를 진행
      const submit = await fillDetailRef.current?.submit?.();
      if (!submit) return;

      // 스토어에서 작성 데이터 취득
      const requestInfo = useRequestStore.getState().getRequestInfo();

      //한국 성별 -> 영어 성별로 변환(만약 서버에서 한국어로 받는게 문제가 안되면 없애도 될듯)

      const payload = {
        ...requestInfo,
      };
      try {
        // 호출 직전
        console.log(payload);
        const data = await requestSend(payload);
        console.log(payload);
        //응답으로 받은 requestionId를 바로 사용
        const id = data.result.requestionId;
        // 성공 시 이동
        navigate(urlFor.requestDetail(id));
      } catch (err) {
        console.error('Request failed:', err);
        alert('요청 전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
      return;
    }
    next();
  }, [step, isLast, sportsTypeInfo?.categoryId, navigate, requestSend, next]);

  return (
    <div className="box-border flex flex-col items-center py-[100px] text-center">
      {step === 3 ? <FillDetailStep ref={fillDetailRef} /> : <StepComponent />}
      <div className="mt-12">
        <Button onClick={handleNext} width="w-[26rem]">
          {isLast ? '작성 완료' : '다음'}
        </Button>
      </div>
      <div className="mt-[55px]">
        <Stepper total={3} current={step} />
      </div>
    </div>
  );
};

export default RequestFormPage;
