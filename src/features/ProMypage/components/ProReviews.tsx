import { useState } from 'react';

import Pagination from '@/components/Pagination';
import ReviewCard from '@/components/ReviewCard';
import { useGetProReviews } from '@/features/ProMypage/hooks/useGetProReviews';

const ProReviews = () => {
  const [page, setPage] = useState(1);
  const { data: reviews } = useGetProReviews({ page, size: 6 });
  const total = reviews?.totalPages ?? 1;
  const isEmpty = !reviews?.content || reviews.content.length === 0;

  return (
    <div className="flex flex-col items-center justify-center">
      {isEmpty ? (
        <div className="mt-[50px] flex h-[200px] w-[600px] items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
          <p className="text-lg font-medium text-gray-500">아직 받은 후기가 없어요 ✍️</p>
        </div>
      ) : (
        <>
          <div className="mt-[50px] flex w-[600px] flex-col items-center gap-[30px]">
            {reviews?.content.map((rv, idx) => (
              <div key={idx}>
                <ReviewCard
                  imageURL={rv.revieweeImageURL}
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
        </>
      )}
    </div>
  );
};

export default ProReviews;
