import { useMemo, useState } from 'react';

import Button from '@/components/Button';
import Pagination from '@/components/Pagination';
import { mockRequestsDetail } from '@/data/requests';
import RequestsStatusCard from '@/features/Requests/RequestsStatusCard';
import { useSortRequestsStore } from '@/store/useSortRequestsStore';

const RequestsForTrainer = () => {
  const [page, setPage] = useState(1);

  const sort = useSortRequestsStore((state) => state.sort);
  const handleChangeToLatest = useSortRequestsStore((state) => state.handleChangeToLatest);
  const handleChangeToPrice = useSortRequestsStore((state) => state.handleChangeToPrice);

  const pageSize = mockRequestsDetail.pageSize;
  const totalCount = mockRequestsDetail.totalCount;
  //정렬 Test
  const paginatedRequests = useMemo(() => {
    const sorted = [...mockRequestsDetail.data];
    if (sort === '가격 높은순') {
      sorted.sort((a, b) => b.totalPrice - a.totalPrice);
    } else {
      sorted.sort((a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime());
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sorted.slice(startIndex, endIndex);
  }, [sort, page, pageSize]);

  return (
    <div className="mx-auto mt-[20px] flex h-auto w-[700px] flex-col gap-[30px]">
      <h1 className="mb-[30px] text-4xl font-bold">요청 현황</h1>
      {/* 정렬 버튼 */}
      <div className="mb-4 flex flex-row justify-start gap-4">
        <Button
          className={`${
            sort === '최신순'
              ? 'bg-button text-white'
              : 'bg-button-nonSelected hover:bg-button-nonSelected-hover text-[#7D7D7D]'
          }`}
          onClick={handleChangeToLatest}
        >
          최신순
        </Button>
        <Button
          className={`${
            sort === '가격 높은순'
              ? 'bg-button text-white'
              : 'bg-button-nonSelected hover:bg-button-nonSelected-hover text-[#7D7D7D]'
          }`}
          onClick={handleChangeToPrice}
        >
          가격 높은순
        </Button>
      </div>

      {/* 카드 목록 */}
      <div className="flex flex-col gap-[30px]">
        {paginatedRequests.map((request) => (
          <RequestsStatusCard key={request.id} {...request} />
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="my-[52px] flex w-full justify-center">
        <Pagination page={page} total={Math.ceil(totalCount / pageSize)} onChange={setPage} />
      </div>
    </div>
  );
};

export default RequestsForTrainer;
