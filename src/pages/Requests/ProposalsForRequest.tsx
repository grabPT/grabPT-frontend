import { useState } from 'react';

import { useParams } from 'react-router-dom';

import ErrorComponent from '@/components/ErrorComponent';
import LoadingMuscle from '@/components/LoadingMuscle';
import Pagination from '@/components/Pagination';
import Tabs, { type TabItem } from '@/components/Tabs';
import { urlFor } from '@/constants/routes';
import ProposalsListItem from '@/features/ProposalsForRequest/components/ProposalsListItem';
import { useGetProposalsForRequest } from '@/features/ProposalsForRequest/hooks/useGetProposalsForRequest';

const paramToPositiveInt = (s?: string) => {
  if (!s || !/^\d+$/.test(s)) return undefined;
  const n = parseInt(s, 10);
  return n > 0 ? n : undefined;
};

const ProposalsForRequest = () => {
  const { id } = useParams<{ id?: string }>();
  const [isWriter] = useState<boolean>(true);
  const [page, setPage] = useState(1);

  // URL 파라미터 안전 변환
  const requestionId = paramToPositiveInt(id);

  // 잘못된/누락된 파라미터면 즉시 가드 (훅 호출 X)
  // if (!reqId) retur;

  const { data, error, isPending } = useGetProposalsForRequest({
    requestionId: requestionId || 1,
    page: page,
  });
  const proposalsForRequestList = data?.content || [];

  const TabItems: TabItem[] = [
    { label: '정보', to: urlFor.requestDetail(requestionId) },
    { label: '제안 목록', to: urlFor.requestProposals(requestionId) },
  ];

  if (proposalsForRequestList.length === 0)
    return <h1 className="text-center">제안서가 없습니다.</h1>;
  if (isPending) return <LoadingMuscle />;
  if (error) return <ErrorComponent />;

  console.log(proposalsForRequestList);
  return (
    <section className="flex flex-col items-center py-6">
      {isWriter && <Tabs items={TabItems} width="w-[400px]" />}
      <div className="flex flex-col gap-12 py-12">
        {proposalsForRequestList.map((proposal, idx) => (
          <ProposalsListItem key={idx} proposal={proposal} />
        ))}
      </div>
      <Pagination total={data.totalPages} page={page} onChange={(p) => setPage(p)} />
    </section>
  );
};

export default ProposalsForRequest;
