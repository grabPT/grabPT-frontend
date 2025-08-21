import { Suspense, lazy, useEffect, useState } from 'react';

const Lottie = lazy(() => import('lottie-react')); // 청크 분리

const JsonLottie = ({
  src,
  className,
  loop = true,
  autoplay = true,
  placeholder = <div className="h-48 animate-pulse" aria-hidden />,
}: {
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  placeholder?: React.ReactNode;
}) => {
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(src, { cache: 'force-cache' })
      .then((r) => r.json())
      .then((j) => {
        if (alive) setData(j);
      });
    return () => {
      alive = false;
    };
  }, [src]);

  if (!data) return <>{placeholder}</>;
  return (
    <Suspense fallback={placeholder}>
      <Lottie animationData={data} loop={loop} autoplay={autoplay} className={className} />
    </Suspense>
  );
};

export default JsonLottie;
