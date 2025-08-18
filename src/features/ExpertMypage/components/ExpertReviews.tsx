import { useState } from 'react';

import ErrorComponent from '@/components/ErrorComponent';
import Pagination from '@/components/Pagination';
import ReviewCard from '@/components/ReviewCard';
import { useGetMyReviewsList } from '@/features/Requests/hooks/useGetMyReviewsList';

const ExpertReviews = () => {
  const [page, setPage] = useState(1);
  const { data: myReviewsList, isPending, error } = useGetMyReviewsList({ page, size: 6 });
  if (error) return <ErrorComponent />;
  const total = myReviewsList?.totalPages ?? 1;

  return (
    <div className="flex justify-center">
      {isPending && <>스켈레톤 ui</>}
      <div className="mt-[50px] flex w-[800px] flex-col gap-[30px]">
        {myReviewsList?.content.map((rv, idx) => (
          <div key={idx}>
            <ReviewCard
              name={rv.nickName}
              location={rv.residence}
              rating={rv.rating}
              content={rv.content}
            />
          </div>
        ))}
      </div>
      <Pagination total={total} page={page} onChange={setPage} />
    </div>
  );
};

export default ExpertReviews;
