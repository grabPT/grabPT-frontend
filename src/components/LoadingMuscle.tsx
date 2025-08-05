import Lottie from 'lottie-react';

import muscleAnimate from '@/assets/json/Muscle.json';

// 로딩애니메이션 컴포넌트입니다. (귀여움)
// 높이 고정해놨습니다.
const LoadingMuscle = () => {
  return (
    <>
      <Lottie animationData={muscleAnimate} loop={true} className="h-48" />
      <h2 className="text-button mt-8 text-center text-2xl font-extrabold italic">
        근육이 만들어지는 중 ...
      </h2>
    </>
  );
};

export default LoadingMuscle;
