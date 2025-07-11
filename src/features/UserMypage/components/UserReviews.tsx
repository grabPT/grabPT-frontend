import ReviewCard from '@/components/ReviewCard';

const UserReviews = () => {
  const review = {
    name: '날다람주날닮았쥐',
    location: '서울시 강서구 화곡동',
    rating: 3.5,
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
    </div>
  );
};

export default UserReviews;
