import { useState } from 'react';

import ProfileImage from '@/components/ProfileImage';
import { useGetContractList } from '@/features/Contract/hooks/useGetContractList';
import { useRoleStore } from '@/store/useRoleStore';

const ContractListPage = () => {
  const [filter, setFilter] = useState('전체');
  const [search, setSearch] = useState('');
  const { role, userId } = useRoleStore();
  const { data } = useGetContractList({ role, userId });
  const filters = ['전체', '진행중', '완료'];

  const contractList = data?.contracts.content || [];

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
            {[
              { label: '작성중인 계약서', value: `${data?.totalActiveContracts || 0}건`, desc: '현재 진행 중인 계약' },
              { label: '완료된 계약서', value: `${data?.totalCompletedContracts || 0}건`, desc: '종료된 계약' },
            ].map((card) => (
              <div
                key={card.label}
                className="flex h-[6.0625rem] w-[55rem] items-center justify-between rounded-[0.625rem] bg-[#E6ECFF] px-6"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[0.875rem] font-semibold">{card.label}</span>
                  <span className="text-[1.5rem] font-bold text-[#003EFB]">{card.value}</span>
                </div>
                <span className="text-[0.8125rem] text-[#616161]">{card.desc}</span>
              </div>
            ))}
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
                      {/* 회원 정보 */}
                      <div className="flex flex-1 items-center justify-center gap-2">
                        <ProfileImage src={c?.profileImageUrl} alt="프로필 이미지" />
                        <span className="font-medium">{c.userNickname}</span>
                      </div>

                      {/* 계약 상태 */}
                      <div className="flex-1 text-center">
                        <span className="inline-block rounded-[1rem] px-[0.85rem] py-1 text-[0.8125rem] font-bold">
                          {c.matchingStatus === 'MATCHED'
                            ? '완료'
                            : c.matchingStatus === 'MATCHING'
                              ? '진행중'
                              : '대기'}
                        </span>
                      </div>

                      {/* 계약 금액 */}
                      <div className="flex-1 text-center font-semibold">
                        {(c.contractPrice * c.sessionCount).toLocaleString()}원
                      </div>

                      {/* 계약 기간 */}
                      <div className="flex-1 text-center leading-[1.6] text-[#616161]">
                        <div>{c.startDate}</div>
                        <div>~ {c.expireDate}</div>
                      </div>

                      {/* PT 횟수 */}
                      <div className="flex-1 text-center font-semibold">{c.sessionCount}회</div>
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
