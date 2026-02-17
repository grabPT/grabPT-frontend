import { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import HeaderProfile from '@/assets/images/HeaderProfile.png';
import ROUTES from '@/constants/routes';
import { NextArrow, PrevArrow } from '@/features/home/components/CustomArrow';
import RequestCardInMain from '@/features/home/components/RequestCardInMain';
import type { RequestSliderItemType } from '@/features/home/types/request';
import { useRoleStore } from '@/store/useRoleStore';

const getSlidesToShow = (width: number) => {
  if (width < 720) return 1;
  if (width < 1024) return 2;
  if (width < 1440) return 2;
  if (width < 1820) return 3;
  return 4;
};

interface RequestSliderProps {
  title: string;
  requests: RequestSliderItemType[];
  name?: string;
  location?: string;
}

/**
 * 사용자 요청서 슬라이더
 */
const RequestSlider = ({ title, requests, location, name }: RequestSliderProps) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSliderReady, setIsSliderReady] = useState(false);
  const [slidesToShowNow, setSlidesToShowNow] = useState(getSlidesToShow(window.innerWidth));
  const { role } = useRoleStore();
  const sliderRef = useRef<Slider>(null);

  // 요청서 페이지로 이동하는 함수
  const handleNavigate = () => {
    if (role === 'USER') {
      //상대경로 적용 안됨 -> 절대 경로 사용
      navigate(`${ROUTES.MYPAGE.USER}/${ROUTES.MYPAGE.USER_TABS.REQUEST_LIST}`);
    } else if (role === 'PRO') {
      navigate(ROUTES.MATCHING_STATUS.REQUESTS.ROOT);
    }
  };

  const totalSlides = requests?.slice(0, 12).length ?? 0;

  //마지막 슬라이드 계산
  const lastStartIndex = Math.max(0, totalSlides - slidesToShowNow);
  const isAtEnd = currentSlide >= lastStartIndex;

  // 슬라이더 초기화 및 리사이즈 처리
  useEffect(() => {
    const handleResize = () => {
      setSlidesToShowNow(getSlidesToShow(window.innerWidth));
      sliderRef.current?.slickGoTo(0);
    };

    // 초기 로드 시 슬라이더 준비 상태로 설정
    const timer = setTimeout(() => {
      setIsSliderReady(true);
      sliderRef.current?.slickGoTo(0);
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
    nextArrow: <NextArrow isAtEnd={isAtEnd} onEndClick={handleNavigate} role={role} />,
    prevArrow: currentSlide === 0 ? undefined : <PrevArrow />,
    responsive: [
      {
        breakpoint: 1820,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 0, // 반응형에서도 초기 슬라이드 명시
        },
      },
      {
        breakpoint: 1440,
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

  if (!isSliderReady) {
    return (
      <section className="3xl:w-[1480px] flex flex-col gap-9 sm:w-[720px] md:w-[820px] lg:w-[920px] xl:w-[1080px] 2xl:w-[1280px]">
        <h2 className="font-pretendard ml-[10px] text-[30px] leading-[100%] font-extrabold tracking-[0%] sm:text-[24px] lg:text-[30px]">
          {title}
        </h2>
        <div className="h-[230px] animate-pulse rounded bg-gray-200"></div>
      </section>
    );
  }

  return (
    <section className="3xl:w-[1480px] flex flex-col gap-9 sm:w-[720px] md:w-[820px] lg:w-[920px] xl:w-[1080px] 2xl:w-[1280px]">
      <h2 className="font-pretendard ml-[10px] text-[30px] leading-[100%] font-extrabold tracking-[0%] sm:text-[24px] lg:text-[30px]">
        {title}
      </h2>

      {requests?.length === 0 ? (
        // ✅ 요청서 없을 때
        <div className="flex h-[230px] items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
          <p className="text-lg font-medium text-gray-500">아직 작성하신 요청서가 없어요 📝</p>
        </div>
      ) : (
        // ✅ 요청서 있을 때
        <div className="slider-container 3xl:w-[1480px] relative mx-auto mb-[4px] sm:w-[720px] md:w-[920px] lg:w-[720px] xl:w-[1080px] 2xl:w-[1280px]">
          <Slider ref={sliderRef} {...settings}>
            {requests?.slice(0, 12).map((r, i) => (
              <div key={`${r.requestId}-${i}`} className="h-[400px] px-4">
                <RequestCardInMain
                  id={r.requestId}
                  name={role === 'USER' ? name : role === 'PRO' ? r.nickname : ''}
                  location={location ?? ''}
                  profileImg={
                    role === 'USER'
                      ? r?.imageURL
                      : role === 'PRO'
                        ? r?.userProfileImageUrl
                        : HeaderProfile
                  }
                  tags={{
                    availableTimes: r.availableTimes,
                    daysPerWeek: r.availableDays.length,
                    categoryName: r.categoryName,
                  }}
                  text={r.content ?? ''}
                  matchStatus={r.status}
                  proProfileId={r.proProfileId}
                  proNickname={r.proNickname || ''}
                  canWriteReview={r.canWriteReview}
                />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </section>
  );
};

export default RequestSlider;
