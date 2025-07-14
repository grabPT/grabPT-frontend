import { useEffect, useState } from 'react';

import clsx from 'clsx';

import BannerImage1 from '@/assets/images/Banner1.png';
import BannerImage2 from '@/assets/images/Banner2.png';
import BannerImage3 from '@/assets/images/Banner3.png';
import FractionPagination from '@/components/FractionPagination';

const Banner = () => {
  const images = [BannerImage1, BannerImage2, BannerImage3];
  const total = images.length;

  const [index, setIndex] = useState(0);

  // 5초마다 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 5000);

    return () => clearInterval(interval);
  }, [total]);

  // translate-x 클래스
  const translateClass = clsx({
    'translate-x-0': index === 0,
    '-translate-x-full': index === 1,
    '-translate-x-[200%]': index === 2,
  });

  const next = () => {
    setIndex((prev) => (prev + 1) % total);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* 슬라이드 래퍼 */}
      <div className={clsx('flex transition-transform duration-500 ease-in-out', translateClass)}>
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`배너 ${idx + 1}`}
            className="w-full shrink-0 object-cover"
            draggable={true}
          />
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="absolute right-4 bottom-4">
        <FractionPagination currentPage={index + 1} totalPage={total} onNext={next} />
      </div>
    </div>
  );
};

export default Banner;
