import Pagination from '@/components/Pagination';
import MyProposalsListItem from '@/features/Proposals/components/MyProposalsListItem';

const ProposalsListPage = () => {
  return (
    <section className="flex flex-col items-center py-12">
      <div>
        <h1 className="w-full text-left text-3xl font-bold">나의 제안 현황</h1>

        <div className="mt-16 mb-16 flex flex-col gap-10">
          {[0, 0, 0, 0, 0, 0, 0].map((_, idx) => {
            return <MyProposalsListItem key={idx} />;
          })}
        </div>
      </div>

      <Pagination total={5} page={1} onChange={() => console.log('나중에할게요')} />
    </section>
  );
};

export default ProposalsListPage;
