import { useRef, useState } from 'react';

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

  const settings = {
    infinite: false,
    centerMode: false,
    centerPadding: '0px',
    slidesToShow: 2,
    swipeToSlide: true,
    arrows: true,
    dots: true,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    nextArrow: <NextArrow />,
    prevArrow: currentSlide === 0 ? undefined : <PrevArrow />,
    responsive: [
      { breakpoint: 720, settings: { slidesToShow: 2, dots: false } }, // 모바일
      { breakpoint: 1080, settings: { slidesToShow: 2 } },             // 태블릿
      { breakpoint: 1440, settings: { slidesToShow: 3 } },             // 노트북
      { breakpoint: 9999, settings: { slidesToShow: 4 } },             // 데스크톱 이상
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
        {/* ✅ key 트릭으로 강제 리렌더 → 초기화 버그 방지 */}
        <Slider key={settings.slidesToShow} {...settings}>
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
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default RequestSlider;
