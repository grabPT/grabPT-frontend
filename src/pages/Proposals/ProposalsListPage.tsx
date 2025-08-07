import { useState } from 'react';

import Pagination from '@/components/Pagination';
import MyProposalsListItem from '@/features/Proposals/components/MyProposalsListItem';
import { useGetProposalsList } from '@/features/Proposals/hooks/useGetProposalsList';

const ProposalsListPage = () => {
  const [page, setPage] = useState<number>(1);
  const { data } = useGetProposalsList({ page: page });

  const totalPage = data?.totalPages || 1;

  return (
    <section className="flex flex-col items-center py-12">
      <div>
        <h1 className="w-full text-left text-3xl font-bold">나의 제안 현황</h1>

        <div className="mt-16 mb-16 flex flex-col gap-10">
          {data?.content.map((proposal, idx) => {
            return <MyProposalsListItem key={idx} proposal={proposal} />;
          })}
        </div>
      </div>

      <Pagination total={totalPage} page={page} onChange={(p) => setPage(p)} />
    </section>
  );
};

export default ProposalsListPage;
