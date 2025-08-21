import { useState } from 'react';

import Pagination from '@/components/Pagination';
import MyProposalsListItem from '@/features/Proposals/components/MyProposalsListItem';
import { useGetProposalsList } from '@/features/Proposals/hooks/useGetProposalsList';

const ProposalsListPage = () => {
  const [page, setPage] = useState<number>(1);
  const { data } = useGetProposalsList({ page });

  const totalPage = data?.totalPages || 1;
  const hasProposals = data?.content && data.content.length > 0;

  return (
    <section className="flex flex-col items-center py-12">
      <div className="w-full">
        <h1 className="text-3xl font-bold">나의 제안 현황</h1>

        <div className="mt-16 mb-16 flex flex-col gap-10">
          {hasProposals ? (
            data.content.map((proposal, idx) => (
              <MyProposalsListItem key={idx} proposal={proposal} />
            ))
          ) : (
            <div className="flex h-[200px] items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
              <p className="text-lg font-medium text-gray-500">
                아직 아무런 제안도 하지 않으셨어요! 😢 <br />
                마음에 드는 요청서에 제안을 남겨보세요.
              </p>
            </div>
          )}
        </div>
      </div>

      {hasProposals && <Pagination total={totalPage} page={page} onChange={(p) => setPage(p)} />}
    </section>
  );
};

export default ProposalsListPage;
