// import { useEffect } from 'react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import Banner from '@/components/Banner';
import RealtimeMatchingStatus from '@/components/RealtimeMatchingStatus';
import RequestSlider from '@/features/home/components/RequestSlider';
import UserSearchSection from '@/features/home/components/UserSearchSection';
import { useGetMyRequestsList } from '@/hooks/useGetMyRequestsList';
<<<<<<< HEAD
// import { useUserRoleStore } from '@/store/useUserRoleStore';
import { useRoleStore } from '@/store/useRoleStore';

const UserMainPage = () => {
  // const { isLoggedIn } = useUserRoleStore();
  const { isLoggedIn } = useRoleStore();
  const { data: requests } = useGetMyRequestsList({ page: 1, size: 40 });
  // const accessToken = useDecodedCookie('accessToken');
  // const refreshToken = useDecodedCookie('refreshToken');
  // useEffect(() => {
  //   localStorage.setItem(accessToken, accessToken);
  //   localStorage.setItem(refreshToken, refreshToken);
  // }, [accessToken, refreshToken]);
=======
import { useRoleStore } from '@/store/useRoleStore';

const UserMainPage = () => {
  const { isLoggedIn } = useRoleStore();
  const { data: requests } = useGetMyRequestsList({ page: 1, size: 40 }, isLoggedIn);
>>>>>>> da0c6b69b2c41f6d853ff7564bb0b698c6ec676c

  return (
    <div className="flex flex-col items-center justify-center">
      <UserSearchSection />

      {isLoggedIn && (
        <div className="mt-[109px]">
          <RequestSlider title={'나의 요청서'} requests={requests?.content ?? []} />
        </div>
      )}

      <div className="my-[200px]">
        <RealtimeMatchingStatus categoryType={'health'} />
      </div>

      <div className="mx-auto mb-[200px] max-w-[1480px] sm:w-[720px] lg:w-[720px] xl:w-[1080px] 2xl:w-[1480px]">
        <Banner />
      </div>
    </div>
  );
};

export default UserMainPage;
