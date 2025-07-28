import { useCallback } from 'react';

import Button from '@/components/Button';
import Stepper from '@/components/Stepper';
import FillDetailStep from '@/features/Request/components/FillDetailStep';
import SelectPriceStep from '@/features/Request/components/SelectPriceStep';
import SelectSportStep from '@/features/Request/components/SelectSportStep';
import useStepParam from '@/features/Request/hooks/UseStepParam';

const STEP_MAP = {
  1: SelectSportStep,
  2: SelectPriceStep,
  3: FillDetailStep,
} as const;

const RequestPage = () => {
  /* step 관리 훅 */
  const { step, next, isLast } = useStepParam(3);

  /* 다음 버튼 핸들러 */
  const handleNextStep = useCallback(() => {
    if (isLast) alert('요청서 제출 완료');

    next(); // 쿼리 파라미터를 step+1 로 수정
  }, [isLast, next]);

  const StepComponent = STEP_MAP[step];

  return (
    <div className="box-border flex flex-col items-center gap-8 py-12 text-center">
      <StepComponent />
      <Button onClick={handleNextStep} width="w-[26rem]">
        {isLast ? '작성 완료' : '다음'}
      </Button>
      <Stepper total={3} current={step} />
    </div>
  );
};

export default RequestPage;
