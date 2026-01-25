import { useState } from 'react';

import { createPortal } from 'react-dom';
import { Outlet } from 'react-router-dom';

import Button from '@/components/Button';
import Pagination from '@/components/Pagination';
import accumulatedAmount from '@/features/Settlement/assets/accumulatedAmount.svg';
import activeMembers from '@/features/Settlement/assets/activeMembers.svg';
import paymentCount from '@/features/Settlement/assets/paymentCount.svg';
import { PaymentsCard } from '@/features/Settlement/components/PaymentsCard';
import { SettlementInfoCard } from '@/features/Settlement/components/SettlementInfoCard';
import { useGetSettlementList } from '@/features/Settlement/hooks/useGetSettlement';

const ProSettlementPage = () => {
  const [page, setPage] = useState(1);
  //우선은 ui만, 추후에 api만들면 추가해여할 듯F
  const [bank, setBank] = useState('');
  // const [account, setAccount] = useState('');
  // const [name ,setName] = useState('');
  const [postModalOpen, setPostModalOpen] = useState(false);
  const { data: settlementList } = useGetSettlementList(page);
  const formattedEarnings = `${(settlementList?.totalEarnings ?? 0).toLocaleString('ko-KR')}원`;
  const formattedOrders = `${(settlementList?.totalOrders ?? 0).toLocaleString('ko-KR')}건`;
  const formattedActive = `${(settlementList?.activeClients ?? 0).toLocaleString('ko-KR')}명`;
  const total = settlementList?.memberPayments.totalPages ?? 1;
  return (
    <section className="my-[66px]">
      <div className="flex w-full flex-col items-center">
        <div className="flex flex-col items-center justify-center gap-14">
          <div className="flex w-[55rem] flex-col items-start justify-center">
            <h1 className="text-[2.5rem] font-semibold">정산 내역</h1>
            <span className="text-[1.0625rem] font-semibold">
              회원 결제 내역과 적립금을 확인하고 정산을 등록하세요.
            </span>
          </div>
          <div className="flex w-[55rem] flex-col items-center justify-center gap-6">
            <SettlementInfoCard
              title="적립 금액"
              content={formattedEarnings}
              img={accumulatedAmount}
            />
            <SettlementInfoCard title="총 결제 건수" content={formattedOrders} img={paymentCount} />
            <SettlementInfoCard title="활성 회원" content={formattedActive} img={activeMembers} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-14">
          <div className="mt-20 flex w-[55rem] flex-col items-start justify-center">
            <h2 className="text-[2.5rem] font-semibold">회원 결제 내역</h2>
          </div>
          <div className="mt-5 flex w-full flex-col items-center justify-center">
            <div className="flex w-[55rem] items-center text-[0.875rem] font-semibold">
              <div className="flex-[1] text-center">
                <span>회원정보</span>
              </div>
              <div className="flex-[1] text-center">
                <span>PT 횟수</span>
              </div>
              <div className="flex-[1] text-center">
                <span>결제 금액</span>
              </div>
              <div className="flex-[1] text-center">
                <span>적립 금액</span>
              </div>
              <div className="flex-[1] text-center">
                <span>결제일</span>
              </div>
            </div>
            <hr className="my-4 h-[0.09375rem] w-[55rem] border border-[#B3B3B3]" />
            {!settlementList?.memberPayments.content ||
            settlementList.memberPayments.content.length === 0 ? (
              <div className="mt-[1.56rem] flex h-[200px] w-[55rem] items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
                <p className="text-lg font-medium text-gray-500">아직 회원 결제 내역이 없어요 💳</p>
              </div>
            ) : (
              <>
                <div className="mt-[1.56rem] flex flex-col items-center justify-center gap-[1.56rem]">
                  {settlementList.memberPayments.content.map((payment, idx) => {
                    return (
                      <PaymentsCard
                        key={idx}
                        earnedAmount={payment.earnedAmount}
                        memberName={payment.memberName}
                        paymentAmount={payment.paymentAmount}
                        paymentDate={payment.paymentDate}
                        ptCount={payment.ptCount}
                      />
                    );
                  })}
                </div>
                {/* 페이지네이션 */}
                {total > 1 && (
                  <div className="mt-8">
                    <Pagination total={total} page={page} onChange={setPage} />
                  </div>
                )}
              </>
            )}
            <button
              className="mt-8 h-[2.625rem] w-[11rem] rounded-[0.625rem] bg-[#003EFB] text-[0.875rem] font-semibold text-white"
              onClick={() => setPostModalOpen(true)}
            >
              + 정산 등록
            </button>
            <div className="mt-28 flex w-[55rem] items-center text-[0.875rem] font-semibold">
              <div className="flex-[1] text-center">
                <span>일시</span>
              </div>
              <div className="flex-[1] text-center">
                <span>정산 금액</span>
              </div>
              <div className="flex-[1] text-center">
                <span>은행명</span>
              </div>
              <div className="flex-[1] text-center">
                <span>계좌 번호</span>
              </div>
              <div className="flex-[1] text-center">
                <span>처리 상태</span>
              </div>
            </div>
            <hr className="my-4 h-[0.09375rem] w-[55rem] border border-[#B3B3B3]" />
            {/* 이거 관련도 매핑 로직 추가되어야 하는데 api를 못 찾음 */}
          </div>
        </div>
        {postModalOpen &&
          createPortal(
            <div
              className="fixed inset-0 z-50 flex h-svh w-screen items-center justify-center bg-black/40"
              onClick={() => setPostModalOpen(false)} // 배경 클릭 시 모달 닫기
            >
              <div
                className="relative flex h-[35.25rem] w-[26.9375rem] items-start justify-center rounded-[0.625rem] bg-white shadow-lg"
                onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 이벤트 전파 방지
              >
                <div className="flex w-[23.75rem] flex-col items-center justify-center gap-5">
                  <h2 className="mt-7 text-2xl font-semibold">정산 등록</h2>

                  <div className="mt-2 flex h-[6.0625rem] w-[23.75rem] items-center justify-between rounded-[0.625rem] bg-[#E6ECFF] px-6">
                    <div className="flex flex-col items-start justify-center gap-1">
                      <span className="text-[0.875rem] font-semibold">정산 예정 금액</span>
                      <span className="text-2xl font-semibold text-[#003EFB]">
                        {settlementList?.totalEarnings}원
                      </span>
                    </div>
                    <img alt="적립 금액 이미지" src={accumulatedAmount} />
                  </div>

                  <div className="flex w-full flex-col gap-1">
                    <span className="font-semibold">은행명</span>
                    <select
                      aria-label="은행명"
                      className="rounded-[0.625rem] border border-[#BDBDBD] py-[0.8rem] pl-4 text-[#616161]"
                      value={bank}
                      onChange={(e) => setBank(e.target.value)}
                    >
                      <option value="" disabled>
                        은행명을 선택하세요
                      </option>
                      <option value="kb">국민은행</option>
                      <option value="shinhan">신한은행</option>
                      <option value="woori">우리은행</option>
                      <option value="nh">농협은행</option>
                      <option value="ibk">기업은행</option>
                      <option value="hana">하나은행</option>
                    </select>
                  </div>

                  <div className="flex w-full flex-col gap-1">
                    <span className="font-semibold">계좌번호</span>
                    <input
                      type="text"
                      placeholder="계좌번호"
                      className="rounded-[0.625rem] border border-[#BDBDBD] py-[0.8rem] pl-4 text-[#616161]"
                    />
                  </div>

                  <div className="flex w-full flex-col gap-1">
                    <span className="font-semibold">예금주</span>
                    <input
                      type="text"
                      placeholder="예금주"
                      className="rounded-[0.625rem] border border-[#BDBDBD] py-[0.8rem] pl-4 text-[#616161]"
                    />
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <Button
                      type="button"
                      width="w-[11.375rem]"
                      onClick={() => setPostModalOpen(false)}
                    >
                      취소
                    </Button>
                    <Button
                      type="button"
                      width="w-[11.375rem]"
                      onClick={() => setPostModalOpen(false)}
                    >
                      확인
                    </Button>
                  </div>
                </div>
              </div>
            </div>,
            document.body, // createPortal의 두 번째 인자로 타겟 DOM 명시
          )}
        <Outlet />
      </div>
    </section>
  );
};

export default ProSettlementPage;
