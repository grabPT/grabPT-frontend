import Pagination from '@/components/Pagination';
import ReviewCard from '@/components/ReviewCard';
//이 부분은 기존에 있던 ExpertReviews와 동일한데 어느 부분이 달라야하는지 잘 모르겠어서 나중에 수정 예정
//수정할 부분-> ReviewCard에서 x버튼 권한에 따라 부여 필요 
const ExpertDetailReviews = () => {
  const review = {
    name: '날다람주날닮았쥐',
    location: '서울시 강서구 화곡동',
    rating: 4,
    content:
      '너무너무 친절하시고, 운동하면서 부족한 부분을 너무 잘 지적해주셨습니다!! 저는 20회 추가 PT 신청했습니다!!~~~~~~~~~~~~~~~~~~~~~~~~~',
  };

  const reviews = Array.from({ length: 5 }, () => review);

  return (
    <div className="flex justify-center">
      <div className="mt-[50px] flex w-[800px] flex-col gap-[30px]">
        {reviews.map((rv, idx) => (
          <div key={idx}>
            <ReviewCard
              name={rv.name}
              location={rv.location}
              rating={rv.rating}
              content={rv.content}
            />
          </div>
        ))}
      </div>
      <Pagination
        total={0}
        page={0}
        onChange={function (_page: number): void { //미사용
          throw new Error('Function not implemented.');
        }}
      />
    </div>
  );
};

export default ExpertDetailReviews;
