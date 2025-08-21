import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import Banner from '@/components/Banner';
import RealtimeMatchingStatus from '@/components/RealtimeMatchingStatus';
import { SPORTS } from '@/constants/sports';
import RequestSlider from '@/features/home/components/RequestSlider';
import UserSearchSection from '@/features/home/components/UserSearchSection';
import { useGetMyRequestsList } from '@/hooks/useGetMyRequestsList';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import { useRoleStore } from '@/store/useRoleStore';
import type { SportsSlugType } from '@/types/SportsType';

const UserMainPage = () => {
  const { isLoggedIn, role } = useRoleStore();
  const { data: requests } = useGetMyRequestsList({ page: 1, size: 40 }, isLoggedIn);
  // 랜덤 선택 함수
  function getRandomSportSlug(): SportsSlugType {
    const randomIndex = Math.floor(Math.random() * SPORTS.length);
    return SPORTS[randomIndex].slug;
  }
  const { data: userData } = useGetUserInfo();
  const location = `${userData?.address?.[0]?.city ?? ''} ${userData?.address?.[0]?.district ?? ''} ${userData?.address?.[0]?.street ?? ''}`;
  const matched = SPORTS.find((s) => s.slug === userData?.categoryName);
  const categoryType: SportsSlugType =
    role === 'GUEST'
      ? getRandomSportSlug()
      : role === 'USER'
        ? (matched?.slug ?? 'health')
        : 'health'; // fallback
  return (
    <div className="flex flex-col items-center justify-center">
      <UserSearchSection />

      {isLoggedIn && (
        <div className="mt-[109px] flex w-full flex-col items-center">
          {requests?.content && requests.content.length > 0 ? (
            <RequestSlider
              title={'나의 요청서'}
              requests={requests.content}
              location={location}
              name={userData?.nickname}
            />
          ) : (
            <div className="flex max-w-[1480px] flex-col">
              <h2 className="font-pretendard ml-[10px] text-[30px] leading-[100%] font-extrabold tracking-[0%] sm:text-[24px] lg:text-[30px]">
                나의 요청서
              </h2>
              <div className="flex h-[200px] w-full items-center justify-center rounded-2xl border border-gray-200 bg-gray-50">
                <p className="text-lg font-medium text-gray-500">
                  아직 작성하신 요청서가 없어요 📝
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="my-[200px]">
        <RealtimeMatchingStatus categoryType={categoryType} />
      </div>

      <div className="mx-auto mb-[200px] max-w-[1480px] sm:w-[720px] lg:w-[720px] xl:w-[1080px] 2xl:w-[1480px]">
        <Banner />
      </div>
    </div>
  );
};

export default UserMainPage;
