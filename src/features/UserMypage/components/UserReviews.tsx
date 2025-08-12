import { useState } from 'react';

import ErrorComponent from '@/components/ErrorComponent';
import Pagination from '@/components/Pagination';
import ReviewCard from '@/components/ReviewCard';
import { useGetMyReviewsList } from '@/features/Requests/hooks/useGetMyReviewsList';

const UserReviews = () => {
  const [page, setPage] = useState(1);
  const { data: myReviewsList, isPending, error } = useGetMyReviewsList({ page, size: 6 });
  if (error) return <ErrorComponent />;
  const total = myReviewsList?.totalPages ?? 1;

  return (
    <div className="flex flex-col items-center justify-center">
      {isPending && <>스켈레톤 ui</>}
      <div className="mt-[50px] flex w-[800px] flex-col gap-[30px]">
        {myReviewsList?.content.map((rv, idx) => (
          <div key={idx}>
            <ReviewCard
              name={rv.nickName}
              location={rv.residence}
              rating={rv.rating}
              content={rv.content}
              proNickName={rv.proNickName}
              center={rv.center}
              proId={rv.proId}
              imageURL={rv.imageURL}
            />
          </div>
        ))}
      </div>
      {/* 페이지네이션 */}
      {
        <div className="mt-8">
          <Pagination total={total} page={page} onChange={setPage} />
        </div>
      }
    </div>
  );
};

export default UserReviews;
