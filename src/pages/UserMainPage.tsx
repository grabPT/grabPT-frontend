import React, { useRef } from 'react';

import Banner from '@/components/Banner';
import RequestCardScroll from '@/features/home/components/RequestCardScroll';
import UserSearchSection from '@/features/home/components/UserSearchSection';
import mockRequests from '@/features/home/data/dummy';

const UserMainPage: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // const handleScroll = () => {
  //   sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  // };

  return (
    <div className="flex flex-col">
      {/* 유저 검색창 */}
      <UserSearchSection />

      {/* 요청서 섹션 */}
      <section className="mx-[100px] mt-[109px] mb-20 flex flex-col gap-9" ref={sectionRef}>
        <h2 className="font-pretendard text-[30px] leading-[100%] font-extrabold tracking-[0%] w-[1477px] mx-auto">
          나의 요청서
        </h2>
        <RequestCardScroll requests={mockRequests} />
        <Banner />
      </section>
    </div>
  );
};

export default UserMainPage;
