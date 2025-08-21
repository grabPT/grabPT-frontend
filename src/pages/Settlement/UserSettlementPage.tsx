import { useState } from 'react';

import { Outlet } from 'react-router-dom';

import Pagination from '@/components/Pagination';
import { UserPaymentsCard } from '@/features/Settlement/components/UserPaymentsCard';
import { useGetUserSettlements } from '@/features/Settlement/hooks/useGetUserSettlements';

const UserSettlementPage = () => {
  const [page, setPage] = useState(1);
  const { data: settlementList } = useGetUserSettlements({ page });
  const total = settlementList?.payments.totalPages ?? 1;
  return (
    <section className="my-[66px]">
      <div className="flex w-full flex-col items-center">
        <div className="flex flex-col items-center justify-center gap-14">
          <div className="mt-20 flex w-[55rem] flex-col items-start justify-center">
            <h2 className="text-[2.5rem] font-semibold">회원 결제 내역</h2>
          </div>
          <div className="mt-5 flex w-full flex-col items-center justify-center">
            <div className="flex w-[55rem] items-center text-[0.875rem] font-semibold">
              <div className="flex-[1] text-center">
                <span>트레이너 정보</span>
              </div>
              <div className="flex-[1] text-center">
                <span>PT 횟수</span>
              </div>
              <div className="flex-[1] text-center">
                <span>결제 금액</span>
              </div>
              <div className="flex-[1] text-center">
                <span>결제일</span>
              </div>
            </div>
            <hr className="my-4 h-[0.09375rem] w-[55rem] border border-[#B3B3B3]" />
            <div className="mt-[1.56rem] flex flex-col items-center justify-center gap-[1.56rem]">
              {settlementList?.payments.content.map((payment, idx) => {
                return <UserPaymentsCard key={idx} data={payment} />;
              })}
            </div>
            {/* 페이지네이션 */}
            {total > 1 && (
              <div className="mt-8">
                <Pagination total={total} page={page} onChange={setPage} />
              </div>
            )}
          </div>
        </div>

        <Outlet />
      </div>
    </section>
  );
};

export default UserSettlementPage;
