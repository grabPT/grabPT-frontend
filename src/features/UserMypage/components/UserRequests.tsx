import { useState } from 'react';

import ErrorComponent from '@/components/ErrorComponent';
import Pagination from '@/components/Pagination';
import RequestCard from '@/features/UserMypage/components/RequestCard';
import { useGetMyRequestsList } from '@/hooks/useGetMyRequestsList';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import { useRoleStore } from '@/store/useRoleStore';

const UserRequests = () => {
  const [page, setPage] = useState(1);
  const { isLoggedIn } = useRoleStore();
  /** 실제 환경에선 API 응답으로 교체 */
  const {
    data: myRequestsList,
    isPending,
    error,
  } = useGetMyRequestsList({ page, size: 5 }, isLoggedIn);
  //닉네임 정보를 스토어에서 가져와서 제대로 안 뜰 수도 있음(임시방편)
  const { data } = useGetUserInfo();

  const location = `${data?.address[0].city} ${data?.address[0].district} ${data?.address[0].street}`;
  const total = myRequestsList?.totalPages ?? 1;
  if (error) return <ErrorComponent />;
  return (
    <div className="flex flex-col items-center">
      {isPending && <>스켈레톤 ui</>}
      {/* 요청 카드 목록 */}
      <div className="mt-[50px] flex w-[800px] flex-col gap-[30px]">
        {myRequestsList?.content.map((rq, idx) => (
          <RequestCard
            key={`${page}-${idx}`}
            requestionId={rq.requestId}
            location={location}
            name={data?.nickname ?? '사용자'}
            profileImg={data?.profileImageUrl}
            tags={{
              availableTimes: rq.availableTimes,
              daysPerWeek: rq.availableDays.length,
              cagtegoryName: rq.categoryName,
            }}
            content={rq.content}
          />
        ))}
      </div>

      {/* 페이지네이션 */}
      {total > 1 && (
        <div className="mt-8">
          <Pagination total={total} page={page} onChange={setPage} />
        </div>
      )}
    </div>
  );
};

export default UserRequests;
