import { useState } from 'react';

import { TransactionInfoCard } from '@/components/TransactionInfoCard';
import ContractCompletedIcon from '@/features/Contract/assets/ContractCompletedIcon.svg';
import ContractDraftIcon from '@/features/Contract/assets/ContractDraftIcon.svg';
import ContractListInfoCard from '@/features/Contract/components/ContractListInfoCard';
import { useGetContractList } from '@/features/Contract/hooks/useGetContractList';
import { useRoleStore } from '@/store/useRoleStore';

const ContractListPage = () => {
  const [filter, setFilter] = useState('전체');
  const [search, setSearch] = useState('');
  const { role, userId } = useRoleStore();
  const { data } = useGetContractList({ role, userId });
  const filters = ['전체', '진행중', '완료'];

  const contractList = data?.contracts.content || [];
  const formattedActive = `${(data?.totalActiveContracts ?? 0).toLocaleString('ko-KR')}건`;
  const formattedCompleted = `${(data?.totalCompletedContracts ?? 0).toLocaleString('ko-KR')}명`;
  const filtered = contractList.filter((c) => {
    const isStatusMatch =
      (filter === '진행중' && c.matchingStatus === 'MATCHED') ||
      (filter === '완료' && c.matchingStatus === 'COMPLETED');
    const matchFilter = filter === '전체' || isStatusMatch;

    const query = search.toLowerCase();
    const matchSearch = !search || c.userNickname.toLowerCase().includes(query);
    return matchFilter && matchSearch;
  });

  return (
    <section className="my-[66px]">
      <div className="flex w-full flex-col items-center">
        {/* ── 페이지 헤더 ── */}
        <div className="flex flex-col items-center justify-center gap-14">
          <div className="flex w-[55rem] flex-col items-start justify-center">
            <h1 className="text-[2.5rem] font-semibold">계약 내역</h1>
            <span className="text-[1.0625rem] font-semibold">
              진행 중인 계약과 완료된 계약을 한눈에 확인하세요.
            </span>
          </div>

          {/* ── 요약 카드 2개 ── */}
          <div className="flex w-[55rem] flex-col items-center justify-center gap-6">
            <div className="flex w-[55rem] flex-col items-center justify-center gap-6">
              <TransactionInfoCard
                title="작성 중인 계약서"
                content={formattedActive}
                img={ContractDraftIcon}
              />
              <TransactionInfoCard
                title="완료된 계약서"
                content={formattedCompleted}
                img={ContractCompletedIcon}
              />
            </div>
          </div>
        </div>

        {/* ── 계약서 목록 ── */}
        <div className="flex flex-col items-center justify-center gap-14">
          <div className="mt-20 w-[55rem]">
            <h2 className="text-[2.5rem] font-semibold">계약서 목록</h2>
          </div>

          <div className="flex w-[55rem] flex-col">
            {/* 필터 + 검색 */}
            <div className="mb-5 flex items-center justify-between">
              <div className="flex gap-2">
                {filters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`cursor-pointer rounded-[0.625rem] border-2 px-4 py-[0.4rem] text-[0.875rem] font-semibold ${
                      filter === f
                        ? 'border-[#003EFB] bg-[#003EFB] text-[#fff]'
                        : 'border-[#BDBDBD] bg-[#fff] text-[#616161]'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="사용자 검색"
                className="w-[13rem] rounded-[0.625rem] border border-[#BDBDBD] px-4 py-2 text-[0.875rem] text-[#616161] outline-none"
              />
            </div>

            {/* 테이블 헤더 */}
            <div className="flex w-[55rem] text-[0.875rem] font-bold text-[#222]">
              {['계약 상대', '계약 상태', '계약 금액', '계약 기간', 'PT 횟수'].map((h) => (
                <div key={h} className="flex-1 text-center">
                  {h}
                </div>
              ))}
            </div>

            <hr className="my-4 w-[55rem] border-t border-[#B3B3B3]" />

            {/* 계약 행 */}
            {filtered?.length === 0 ? (
              <div className="mt-[1.56rem] flex h-[200px] w-[55rem] items-center justify-center rounded-xl border border-[#E0E0E0] bg-[#FAFAFA] text-[1.0625rem] font-medium text-[#9E9E9E]">
                조회된 계약서가 없어요 📋
              </div>
            ) : (
              <div className="mt-[1.56rem] flex flex-col gap-[1.56rem]">
                {filtered?.map((c, index) => {
                  return (
                    <div
                      key={index}
                      className="flex w-[55rem] items-center text-[0.875rem] text-[#222]"
                    >
                      <ContractListInfoCard contract={c} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContractListPage;
