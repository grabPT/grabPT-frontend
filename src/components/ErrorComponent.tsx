import Lottie from 'lottie-react';
import { createPortal } from 'react-dom';

import Error from '@/assets/json/ErrorEmoji.json';

// 로딩애니메이션 컴포넌트입니다. (귀여움)
// 높이 고정해놨습니다.
const ErrorComponent = () =>
  createPortal(
    <div
      role="status"
      aria-busy="true"
      className="fixed bottom-0 z-[9999] flex h-[calc(100dvh-70px)] w-full flex-col items-center justify-center bg-white"
    >
      <Lottie animationData={Error} loop className="h-48" />
      <h2 className="mt-8 text-center text-2xl font-extrabold italic">Error</h2>
      <h2 className="mt-8 text-center text-2xl font-extrabold italic">네트워크를 확인해주세요.</h2>
    </div>,
    document.body,
  );

export default ErrorComponent;
