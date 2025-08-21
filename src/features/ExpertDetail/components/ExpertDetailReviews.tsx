import { useState } from 'react';

import { useParams } from 'react-router-dom';

import Pagination from '@/components/Pagination';
import ReviewCard from '@/components/ReviewCard';
import { useGetReviewsByUserId } from '@/features/ExpertDetail/hooks/useGetReveiwsByUserId';

//이 부분은 기존에 있던 ExpertReviews와 동일한데 어느 부분이 달라야하는지 잘 모르겠어서 나중에 수정 예정
//수정할 부분-> ReviewCard에서 x버튼 권한에 따라 부여 필요
const ExpertDetailReviews = () => {
  const [page, setPage] = useState(1);
  const { id } = useParams<{ id: string }>();
  const { data: reviews } = useGetReviewsByUserId({ userId: Number(id) || 0, page, size: 6 });
  const total = reviews?.totalPages ?? 1;
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-[50px] flex w-full flex-col items-center gap-[30px]">
        {reviews?.content.map((rv, idx) => (
          <div key={idx}>
            <ReviewCard
              imageURL={rv.imageURL}
              name={rv.nickName}
              location={rv.residence}
              rating={rv.rating}
              content={rv.content}
              isExpertDetail={true}
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

export default ExpertDetailReviews;
