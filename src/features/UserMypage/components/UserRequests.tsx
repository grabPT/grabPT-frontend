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

  const {
    data: myRequestsList,
    isPending,
    error,
  } = useGetMyRequestsList({ page, size: 5 }, isLoggedIn);

  const { data } = useGetUserInfo();

  const location = `${data?.address?.[0]?.city ?? ''} ${data?.address?.[0]?.district ?? ''} ${
    data?.address?.[0]?.street ?? ''
  }`;
  const total = myRequestsList?.totalPages ?? 1;

  if (error) return <ErrorComponent />;

  return (
    <div className="flex flex-col items-center">
      {isPending && (
        <div className="mt-[50px] flex w-[600px] flex-col gap-[30px]">
          {Array.from({ length: 5 }).map((_, idx) => (
            <RequestCard.Skeleton key={idx} />
          ))}
        </div>
      )}

      {!isPending && (
        <div className="mt-[50px] flex w-[600px] flex-col gap-[30px]">
          {myRequestsList?.content && myRequestsList.content.length > 0 ? (
            myRequestsList.content.map((rq, idx) => (
              <RequestCard
                key={`${page}-${idx}`}
                requestionId={rq.requestId}
                location={location}
                name={data?.nickname ?? '사용자'}
                profileImg={data?.profileImageUrl}
                tags={{
                  availableTimes: rq.availableTimes,
                  daysPerWeek: rq.availableDays.length,
                  categoryName: rq.categoryName,
                }}
                content={rq.content}
              />
            ))
          ) : (
            <div className="flex h-[200px] items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
              <p className="text-lg font-medium text-gray-500">아직 작성하신 요청서가 없어요 📝</p>
            </div>
          )}
        </div>
      )}

      {total > 1 && !isPending && (
        <div className="mt-8">
          <Pagination total={total} page={page} onChange={setPage} />
        </div>
      )}
    </div>
  );
};

export default UserRequests;
