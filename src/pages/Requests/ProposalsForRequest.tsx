import { useState } from 'react';

import { useParams } from 'react-router-dom';

import Pagination from '@/components/Pagination';
import Tabs, { type TabItem } from '@/components/Tabs';
import { urlFor } from '@/constants/routes';
import ProposalsListItem from '@/features/RequestsDetail/ProposalsListItem';

// type ProposalsForRequestResponseDto = {
//   isSuccess: boolean;
//   code: string;
//   message: string;
//   result: {
//     totalPages: number;
//     totalElements: number;
//     size: number;
//     content: ProposalsListType[];
//     number: number;
//     sort: {
//       empty: boolean;
//       unsorted: boolean;
//       sorted: boolean;
//     };
//     numberOfElements: number;
//     pageable: {
//       offset: number;
//       sort: {
//         empty: boolean;
//         unsorted: boolean;
//         sorted: boolean;
//       };
//       paged: boolean;
//       unpaged: boolean;
//       pageNumber: number;
//       pageSize: number;
//     };
//     first: boolean;
//     last: boolean;
//     empty: boolean;
//   };
// };

export type ProposalsListType = {
  // 제안서 상세페이지로 리다이렉트하기 위해 제안서 고유 id 필요합니다!
  nickname: string;
  center: string;
  address: string;
  // pt횟수 누락되어있습니다
  count: number;
  price: number;
  averageRate: number;
};

const data: ProposalsListType[] = [
  {
    nickname: '박수민',
    center: '브라이언박 센터',
    address: '용암동',
    count: 12,
    price: 640000,
    averageRate: 4.5,
  },
  {
    nickname: '김지현',
    center: '스매쉬짐',
    address: '상암동',
    count: 8,
    price: 450000,
    averageRate: 4.0,
  },
  {
    nickname: '최민호',
    center: '파이트클럽',
    address: '마포구',
    count: 10,
    price: 500000,
    averageRate: 3.8,
  },
  {
    nickname: '이유진',
    center: '바디체인지',
    address: '구로구',
    count: 6,
    price: 380000,
    averageRate: 4.2,
  },
  {
    nickname: '장서연',
    center: '빅히트짐',
    address: '강동구',
    count: 8,
    price: 520000,
    averageRate: 4.7,
  },
  {
    nickname: '정도현',
    center: '파워핏',
    address: '관악구',
    count: 5,
    price: 330000,
    averageRate: 3.5,
  },
  {
    nickname: '고은아',
    center: '헬스마스터',
    address: '노원구',
    count: 14,
    price: 700000,
    averageRate: 4.9,
  },
  {
    nickname: '배진우',
    center: '파이터스',
    address: '구리시',
    count: 6,
    price: 420000,
    averageRate: 3.9,
  },
  {
    nickname: '한지훈',
    center: '로드짐',
    address: '일산서구',
    count: 10,
    price: 540000,
    averageRate: 4.1,
  },
  {
    nickname: '서다혜',
    center: '에너지핏',
    address: '수원시',
    count: 9,
    price: 480000,
    averageRate: 4.6,
  },
  {
    nickname: '문현석',
    center: 'K.O 짐',
    address: '부천시',
    count: 7,
    price: 410000,
    averageRate: 3.7,
  },
];

const PAGE_SIZE = 6;

const ProposalsForRequest = () => {
  const { id } = useParams();
  const [isWriter] = useState<boolean>(true);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const sliced = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const onChangePage = (next: number) => {
    if (next < 1 || next > totalPages) return;
    setPage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const TabItems: TabItem[] = [
    { label: '정보', to: urlFor.requestDetail(id as string) },
    { label: '제안 목록', to: urlFor.requestProposals(id as string) },
  ];

  return (
    <section className="flex flex-col items-center py-6">
      {isWriter && <Tabs items={TabItems} width="w-[400px]" />}
      <div className="flex flex-col gap-12 py-12">
        {sliced.map((d, idx) => (
          <ProposalsListItem key={idx} data={d} />
        ))}
      </div>
      <Pagination total={totalPages} page={page} onChange={onChangePage} />
    </section>
  );
};

export default ProposalsForRequest;
