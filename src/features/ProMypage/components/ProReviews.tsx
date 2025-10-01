import { useState } from 'react';

import Pagination from '@/components/Pagination';
import ReviewCard from '@/components/ReviewCard';
import { useGetProReviews } from '@/features/ProMypage/hooks/useGetProReviews';

const ProReviews = () => {
  const [page, setPage] = useState(1);
  const { data: reviews } = useGetProReviews({ page, size: 6 });
  const total = reviews?.totalPages ?? 1;
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-[50px] flex w-[600px] flex-col items-center gap-[30px]">
        {reviews?.content.map((rv, idx) => (
          <div key={idx}>
            <ReviewCard
              imageURL={rv.imageURL}
              name={rv.reviewer}
              location={rv.location}
              rating={rv.rating}
              content={rv.content}
            />
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Pagination total={total} page={page} onChange={setPage} />
      </div>
    </div>
  );
};

export default ProReviews;
