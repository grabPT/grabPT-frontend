import Lottie from 'lottie-react';
import { createPortal } from 'react-dom';

import muscleAnimate from '@/assets/json/Muscle.json';

// 로딩애니메이션 컴포넌트입니다. (귀여움)
// 높이 고정해놨습니다.
const LoadingMuscle = () =>
  createPortal(
    <div
      role="status"
      aria-busy="true"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/70"
    >
      <Lottie animationData={muscleAnimate} loop className="h-48" />
      <h2 className="mt-8 text-center text-2xl font-extrabold italic">
        근육이 만들어지는 중&nbsp;…
      </h2>
    </div>,
    document.body,
  );

export default LoadingMuscle;
