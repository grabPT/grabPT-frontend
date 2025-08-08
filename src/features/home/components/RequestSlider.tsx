import { useRef, useState } from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { NextArrow, PrevArrow } from '@/features/home/components/CustomArrow';
import RequestCardInMain from '@/features/home/components/RequestCard';

type RequestItem = {
  nickname: string;
  region: string;
  tags: string[];
  memo: string;
};

interface RequestSliderProps {
  title: string;
  requests: RequestItem[];
}

function RequestSlider({ title, requests }: RequestSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const settings = {
    className: 'center',
    infinite: false,
    centerPadding: '60px',
    slidesToShow: 4,
    swipeToSlide: true,
    arrows: true,
    dots: true,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    nextArrow: <NextArrow />,
    prevArrow: currentSlide === 0 ? undefined : <PrevArrow />,
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 3 } },
      { breakpoint: 1280, settings: { slidesToShow: 2 } },
      { breakpoint: 1024, settings: { slidesToShow: 2, dots: false } },
    ],
  };

  return (
    <section
      ref={containerRef}
      className="flex max-w-[1480px] flex-col gap-9 sm:w-[720px] lg:w-[720px] xl:w-[1080px] 2xl:w-[1480px]"
    >
      <h2 className="font-pretendard ml-[10px] text-[30px] leading-[100%] font-extrabold tracking-[0%] sm:text-[24px] lg:text-[30px]">
        {title}
      </h2>

      <div className="relative mx-auto mb-[4px] max-w-[1480px] sm:w-[720px] lg:w-[720px] xl:w-[1080px] 2xl:w-[1480px]">
        <Slider {...settings}>
          {requests.slice(0, 12).map((r, i) => (
            <div key={i} className="h-[230px] px-4">
              <RequestCardInMain
                name={r.nickname}
                location={r.region}
                tags={r.tags}
                text={r.memo}
                // 추후 추가
                // id={r.id}
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default RequestSlider;
