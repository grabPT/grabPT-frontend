import { useState } from 'react';

import { useParams } from 'react-router-dom';

import Tabs, { type TabItem } from '@/components/Tabs';

const ProposalsForRequest = () => {
  const { id } = useParams();
  const [isWriter] = useState<boolean>(true);
  const TabItems: TabItem[] = [
    { label: '정보', to: `/requests/${id}` },
    { label: '제안 목록', to: `/requests/${id}/proposals` },
  ];
  return (
    <section className="py-6">
      {isWriter && <Tabs items={TabItems} width="w-[400px]" />}
      <div>제안서목록</div>
    </section>
  );
};

export default ProposalsForRequest;
