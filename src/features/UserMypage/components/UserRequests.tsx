import { useState } from 'react';

import ErrorComponent from '@/components/ErrorComponent';
import Pagination from '@/components/Pagination';
import RequestCard from '@/features/UserMypage/components/RequestCard';
import { useGetMyRequestsList } from '@/hooks/useGetMyRequestsList';

const UserRequests = () => {
  const [page, setPage] = useState(1);
  /** 실제 환경에선 API 응답으로 교체 */
  const { data: myRequestsList, isPending, error } = useGetMyRequestsList({ page: 1, size: 5 });
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
            name={rq.nickname}
            location={rq.city}
            center={rq.specAddress}
            category={rq.categoryName.split(' ')}
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
