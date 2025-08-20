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
  const [isSliderReady, setIsSliderReady] = useState(false);
  const { role } = useRoleStore();
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    adaptiveHeight: false,
    variableWidth: false,
    beforeChange: (_: number, next: number) => {
      setCurrentSlide(next < 0 ? 0 : next);
    },
    afterChange: (current: number) => {
      setCurrentSlide(current);
    },
    nextArrow: <NextArrow />,
    prevArrow: currentSlide === 0 ? undefined : <PrevArrow />,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0, // 반응형에서도 초기 슬라이드 명시
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          initialSlide: 0,
        },
      },
    ],
  };

  // 슬라이더 초기화 및 리사이즈 처리
  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current) {
        sliderRef.current.slickGoTo(0); // 리사이즈 시 첫 번째 슬라이드로
      }
    };

    // 초기 로드 시 슬라이더 준비 상태로 설정
    const timer = setTimeout(() => {
      setIsSliderReady(true);
      if (sliderRef.current) {
        sliderRef.current.slickGoTo(0);
      }
    }, 100);

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 데이터 변경 시 슬라이더 리셋
  useEffect(() => {
    if (isSliderReady && sliderRef.current) {
      setCurrentSlide(0);
      sliderRef.current.slickGoTo(0);
    }
  }, [requests, isSliderReady]);

  // 기존의 자동 클릭 로직 제거 또는 수정
  useEffect(() => {
    if (!isSliderReady) return;

    const timer = setTimeout(() => {
      if (sliderRef.current) {
        // 자동으로 prev 클릭하는 대신, 첫 번째 슬라이드로 확실히 이동
        sliderRef.current.slickGoTo(0);
        console.log('슬라이더 첫 번째로 이동 ✅');
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [isSliderReady]);

  if (!isSliderReady) {
    return (
      <section className="flex max-w-[1480px] flex-col gap-9 sm:w-[720px] lg:w-[720px] xl:w-[1080px] 2xl:w-[1480px]">
        <h2 className="font-pretendard ml-[10px] text-[30px] leading-[100%] font-extrabold tracking-[0%] sm:text-[24px] lg:text-[30px]">
          {title}
        </h2>
        <div className="h-[230px] animate-pulse rounded bg-gray-200"></div>
      </section>
    );
  }

  return (
    <section className="flex max-w-[1480px] flex-col gap-9 sm:w-[720px] lg:w-[720px] xl:w-[1080px] 2xl:w-[1480px]">
      <h2 className="font-pretendard ml-[10px] text-[30px] leading-[100%] font-extrabold tracking-[0%] sm:text-[24px] lg:text-[30px]">
        {title}
      </h2>

      <div className="slider-container relative mx-auto mb-[4px] max-w-[1480px] sm:w-[720px] lg:w-[720px] xl:w-[1080px] 2xl:w-[1480px]">
        <Slider ref={sliderRef} {...settings}>
          {requests.slice(0, 12).map((r, i) => (
            <div key={`${r.requestId}-${i}`} className="h-[230px] px-4">
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
                isMatched={true}
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default RequestSlider;
