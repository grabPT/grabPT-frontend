import { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button';
import Stepper from '@/components/Stepper';
import { urlFor } from '@/constants/routes';
import FillDetailStep from '@/features/Request/components/FillDetailStep';
import SelectPriceStep from '@/features/Request/components/SelectPriceStep';
import SelectSportStep from '@/features/Request/components/SelectSportStep';
import useStepParam from '@/features/Request/hooks/UseStepParam';

const STEP_MAP = {
  1: SelectSportStep,
  2: SelectPriceStep,
  3: FillDetailStep,
} as const;

const RequestFormPage = () => {
  const navigate = useNavigate();
  /* step 관리 훅 */
  const { step, next, isLast } = useStepParam(3);

  /* 다음 버튼 핸들러 */
  const handleNextStep = useCallback(() => {
    if (isLast) {
      alert('요청서 제출 완료');
      // post요청 보내고 id받아와서 해당 요청서 상세페이지로 리다이렉트
      // 일단 하드코딩
      navigate(urlFor.requestDetail(3));
    }

    next(); // 쿼리 파라미터를 step+1 로 수정
  }, [isLast, next, navigate]);

  const StepComponent = STEP_MAP[step];

  return (
    <div className="box-border flex flex-col items-center py-[100px] text-center">
      <StepComponent />
      <div className="mt-12">
        <Button onClick={handleNextStep} width="w-[26rem]">
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
