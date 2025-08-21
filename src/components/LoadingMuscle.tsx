import { createPortal } from 'react-dom';

import JsonLottie from '@/components/JsonLottie';

const base = import.meta.env.BASE_URL;
const muscleUrl = `${base}animations/Muscle.json`;

export default function LoadingMuscle() {
  return createPortal(
    <div
      role="status"
      aria-busy="true"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/70"
    >
      <JsonLottie src={muscleUrl} className="h-48" loop />
      <h2 className="mt-8 text-center text-2xl font-extrabold italic">근육이 만들어지는 중 …</h2>
    </div>,
    document.body,
  );
}
