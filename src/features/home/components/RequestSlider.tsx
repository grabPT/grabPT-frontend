import { useMemo, useRef, useState } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);

  const settings = useMemo(
    () => ({
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4, // 기본 데스크톱 기준 4개
      slidesToScroll: 1,
      initialSlide: 0,
      beforeChange: (_: number, next: number) => setCurrentSlide(next),
      nextArrow: <NextArrow />,
      prevArrow: currentSlide === 0 ? undefined : <PrevArrow />,
      responsive: [
        {
          breakpoint: 720, // 720px 이하 (모바일)
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
          },
        },
        {
          breakpoint: 1024, // 1024px 이하
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: false,
          },
        },
        {
          breakpoint: 1280, // 1280px 이하
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1536, // 1536px 이하
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
      ],
    }),
    [currentSlide],
  );

  return (
    <section
      ref={containerRef}
      className="flex max-w-[1480px] flex-col gap-9 sm:w-[720px] lg:w-[720px] xl:w-[1080px] 2xl:w-[1480px]"
    >
      <h2 className="font-pretendard ml-[10px] text-[30px] leading-[100%] font-extrabold tracking-[0%] sm:text-[24px] lg:text-[30px]">
        {title}
      </h2>

      <div className="slider-container relative mx-auto mb-[4px] max-w-[1480px] sm:w-[720px] lg:w-[720px] xl:w-[1080px] 2xl:w-[1480px]">
        <Slider {...settings}>
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

export function Responsive() {
  const ssettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="slider-container">
      <Slider {...ssettings}>
        <div className="w-[300px]">
          <h3>1</h3>
        </div>
        <div className="w-[300px]">
          <h3>2</h3>
        </div>
        <div className="w-[300px]">
          <h3>3</h3>
        </div>
        <div className="w-[300px]">
          <h3>4</h3>
        </div>
        <div className="w-[300px]">
          <h3>5</h3>
        </div>
        <div className="w-[300px]">
          <h3>6</h3>
        </div>
        <div className="w-[300px]">
          <h3>7</h3>
        </div>
        <div className="w-[300px]">
          <h3>8</h3>
        </div>
      </Slider>
    </div>
  );
}

export default RequestSlider;
