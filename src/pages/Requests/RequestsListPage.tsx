import { useState } from 'react';

import Button from '@/components/Button';
import ErrorComponent from '@/components/ErrorComponent';
import Pagination from '@/components/Pagination';
import RequestsStatusCard from '@/features/Requests/components/RequestsStatusCard';
import { useGetMatchingRequestsList } from '@/features/Requests/hooks/useGetMyRequestsList';
import { useSortRequestsStore } from '@/store/useSortRequestsStore';

const RequestsListPage = () => {
  const [page, setPage] = useState(1);
  const sort = useSortRequestsStore((s) => s.sort);
  const { handleChangeToLatest, handleChangeToPrice } = useSortRequestsStore.getState();

  const {
    data: requestsList,
    isPending,
    error,
  } = useGetMatchingRequestsList({ sortBy: sort, page, size: 6 });

  const totalPages = requestsList?.totalPages ?? 1;
  if (error) return <ErrorComponent />;

  return (
    <div className="mx-auto flex h-auto w-[700px] flex-col gap-[30px] py-12">
      <h1 className="mb-[30px] text-4xl font-bold">요청 현황</h1>

      {/* 정렬 버튼 */}
      <div className="mb-4 flex flex-row justify-start gap-4">
        {isPending ? (
          <>
            <Button.Skeleton width="w-[80px]" height="h-[42px]" />
            <Button.Skeleton width="w-[120px]" height="h-[42px]" />
          </>
        ) : (
          <>
            <Button
              className={`${
                sort === 'latest'
                  ? 'bg-button text-white'
                  : 'bg-button-nonSelected hover:bg-button-nonSelected-hover text-[#7D7D7D]'
              }`}
              onClick={() => {
                handleChangeToLatest();
                setPage(1);
              }}
            >
              최신순
            </Button>
            <Button
              className={`${
                sort === 'price'
                  ? 'bg-button text-white'
                  : 'bg-button-nonSelected hover:bg-button-nonSelected-hover text-[#7D7D7D]'
              }`}
              onClick={() => {
                handleChangeToPrice();
                setPage(1);
              }}
            >
              가격 높은순
            </Button>
          </>
        )}
      </div>

      {/* 카드 목록 */}
      {isPending ? (
        <div className="flex flex-col gap-[30px]">
          {Array.from({ length: 6 }).map((_, i) => (
            <RequestsStatusCard.Skeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-[30px]">
          {requestsList?.content.map((request, idx) => (
            <RequestsStatusCard key={idx} request={request} />
          ))}
        </div>
      )}

      {/* 페이지네이션 */}
      <div className="my-[52px] flex w-full justify-center">
        <Pagination page={page} total={totalPages} onChange={setPage} />
      </div>
    </div>
  );
};

export default RequestsListPage;
