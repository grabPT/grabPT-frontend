import { useState } from 'react';

import Pagination from '@/components/Pagination';
import RequestCard from '@/features/UserMypage/components/RequestCard';

const UserRequests = () => {
  const sample = {
    name: '날다람주날닮았쥐',
    location: '서울시 강서구 화곡동',
    center: '용암동헬스장 브라이언박 트레이닝 센터',
    category: ['복싱', '아침', '점심', '저녁', '주 2회'],
    content:
      '너무너무 친절하시고, 운동하면서 부족한 부분을 너무 잘 지적해주셨습니다!! 저는 20회 추가 PT 신청했습니다!!~~~~~~~~~~~~~~~~~~~~~~~~~',
  };
  /** 실제 환경에선 API 응답으로 교체 */
  const requests = Array.from({ length: 23 }, () => sample);

  const PAGE_SIZE = 5;
  const [page, setPage] = useState(1);
  const total = Math.ceil(requests.length / PAGE_SIZE);

  const paged = requests.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex flex-col items-center">
      {/* 요청 카드 목록 */}
      <div className="mt-[50px] flex w-[800px] flex-col gap-[30px]">
        {paged.map((rq, idx) => (
          <RequestCard
            key={`${page}-${idx}`}
            name={rq.name}
            location={rq.location}
            center={rq.center}
            category={rq.category}
            content={rq.content}
          />
        ))}
      </div>

      {/* 페이지네이션 */}
      {total > 1 && (
        <div className="mt-8">
          <Pagination total={total} page={page} onChange={setPage} />
        </div>
      )}
    </div>
  );
};

export default UserRequests;
