import { useEffect, useRef, useState } from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import HeaderProfile from '@/assets/images/HeaderProfile.png';
import type { RequestsListResultType } from '@/features/Requests/types/getRequestsListType';
import { NextArrow, PrevArrow } from '@/features/home/components/CustomArrow';
import RequestCardInMain from '@/features/home/components/RequestCard';
import { useRoleStore } from '@/store/useRoleStore';

interface RequestSliderProps {
  title: string;
  requests: RequestsListResultType['content'];
  name?: string;
  location?: string;
}

function RequestSlider({ title, requests, location, name }: RequestSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { role } = useRoleStore();
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    nextArrow: <NextArrow />,
    prevArrow: currentSlide === 0 ? undefined : <PrevArrow />,
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 1280, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1, dots: false } },
      { breakpoint: 720, settings: { slidesToShow: 1, slidesToScroll: 1, dots: false } },
    ],
  };

  console.log(currentSlide);

  useEffect(() => {
    const timer = setTimeout(() => {
      const prevBtn = document.querySelector('.slick-prev') as HTMLButtonElement;
      if (prevBtn) {
        prevBtn.click();
        console.log('클릭됨'); // 실제 버튼 클릭
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="flex max-w-[1480px] flex-col gap-9 sm:w-[720px] lg:w-[720px] xl:w-[1080px] 2xl:w-[1480px]">
      <h2 className="font-pretendard ml-[10px] text-[30px] leading-[100%] font-extrabold tracking-[0%] sm:text-[24px] lg:text-[30px]">
        {title}
      </h2>

      <div className="slider-container relative mx-auto mb-[4px] max-w-[1480px] sm:w-[720px] lg:w-[720px] xl:w-[1080px] 2xl:w-[1480px]">
        <Slider ref={sliderRef} {...settings}>
          {requests.slice(0, 12).map((r, i) => (
            <div key={i} className="h-[230px] px-4">
              <RequestCardInMain
                id={r.requestId}
                name={role === 'USER' ? name : role === 'EXPERT' ? r.nickname : ''}
                location={location ?? ''}
                profileImg={
                  role === 'USER'
                    ? r?.imageURL
                    : role === 'EXPERT'
                      ? r?.userProfileImageUrl
                      : HeaderProfile
                }
                tags={{
                  availableTimes: r.availableTimes,
                  daysPerWeek: r.availableDays.length,
                  categoryName: r.categoryName,
                }}
                text={r.content}
                isMatched={r.matchStatus === 'MATCHED'}
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default RequestSlider;
