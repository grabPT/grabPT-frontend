import { useState } from 'react';

import Button from '@/components/Button';
import ErrorComponent from '@/components/ErrorComponent';
import Pagination from '@/components/Pagination';
import RequestsStatusCard from '@/features/Requests/components/RequestsStatusCard';
import { useGetRequestsList } from '@/features/Requests/hooks/useGetRequestsList';
import { useSortRequestsStore } from '@/store/useSortRequestsStore';

const RequestsListPage = () => {
  const [page, setPage] = useState(1);

  /* 정렬 스토어 ── shallow 비교로 객체 재사용하려다가 다음 방식으로 변경했습니다. */
  // 기존 구독형태의 코드로 스토어 사용시 무한루프에 빠지는 버그가 있어서 다음처럼 변경했습니다.
  // 1) 상태만 구독
  const sort = useSortRequestsStore((s) => s.sort);

  // 2) 액션은 구독 없이 단발성으로
  const { handleChangeToLatest, handleChangeToPrice } = useSortRequestsStore.getState();

  /* API 호출 */
  const {
    data: requestsList,
    isPending,
    error,
  } = useGetRequestsList({ sortBy: sort, page, size: 6 });

  /* 총 페이지 (백엔드 값이 최우선) */
  const totalPages = requestsList?.totalPages ?? 1;

  if (error) return <ErrorComponent />;

  return (
    <div className="mx-auto mt-[20px] flex h-auto w-[700px] flex-col gap-[30px]">
      <h1 className="mb-[30px] text-4xl font-bold">요청 현황</h1>
      {/* 정렬 버튼 */}
      <div className="mb-4 flex flex-row justify-start gap-4">
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
      </div>

      {/* 카드 목록 */}
      {isPending && <>스켈레톤ui</>}
      <div className="flex flex-col gap-[30px]">
        {requestsList?.content.map((request, idx) => (
          <RequestsStatusCard key={idx} request={request} />
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="my-[52px] flex w-full justify-center">
        <Pagination page={page} total={totalPages} onChange={setPage} />
      </div>
    </div>
  );
};

export default RequestsListPage;
