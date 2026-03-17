import { useNavigate, useSearchParams } from 'react-router-dom';

// 요청서 작성 페이지 step파라미터 관리 훅
function useStepParam(total = 3) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  /* 현재 스텝 (범위 밖이면 1로 보정) */
  const raw = Number(searchParams.get('step') ?? '1');
  const step = Math.min(Math.max(raw, 1), total) as 1 | 2 | 3; // union narrowing

  /* 공통 내부 함수: URLSearchParams 복사 후 step 수정 */
  const _update = (next: number) => {
    // 한 번 더 보정 (클램핑)
    const fixed = Math.min(Math.max(next, 1), total);
    const params = new URLSearchParams(searchParams);
    params.set('step', String(fixed));

    navigate({ search: params.toString() });
  };

  return {
    step,
    next: () => _update(step + 1),
    prev: () => _update(step - 1),
    setStep: (n: number) => _update(n),
    isFirst: step === 1,
    isLast: step === total,
  };
}

export default useStepParam;
