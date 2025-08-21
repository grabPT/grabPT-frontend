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

      <div className="mt-[50px] flex w-[800px] flex-col items-center gap-[30px]">
        {myReviewsList?.content && myReviewsList.content.length > 0 ? (
          myReviewsList.content.map((rv, idx) => (
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
          ))
        ) : (
          <div className="flex h-[200px] w-full items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
            <p className="text-lg font-medium text-gray-500">아직 작성하신 리뷰가 없어요 📝</p>
          </div>
        )}
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

export default UserReviews;
