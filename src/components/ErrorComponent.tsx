import { createPortal } from 'react-dom';

import JsonLottie from '@/components/JsonLottie';

const base = import.meta.env.BASE_URL;
const errorUrl = `${base}animations/ErrorEmoji.json`;

export default function ErrorComponent() {
  return createPortal(
    <div
      role="status"
      aria-busy="true"
      className="fixed bottom-0 z-[9999] flex h-[calc(100dvh-70px)] w-full flex-col items-center justify-center bg-white"
    >
      <JsonLottie src={errorUrl} className="h-48" loop />
      <h2 className="mt-8 text-center text-2xl font-extrabold italic">Error</h2>
      <h2 className="mt-2 text-center text-2xl font-extrabold italic">네트워크를 확인해주세요.</h2>
    </div>,
    document.body,
  );
}
