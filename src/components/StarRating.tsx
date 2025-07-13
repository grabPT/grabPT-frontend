import Rating from '@mui/material/Rating';


interface StarRatingProps {
  rating: number;
  size?: number;
}

const StarRating = ({ rating, size }: StarRatingProps) => (
  <div>
    <Rating
      value={rating} // 현재 별점
      readOnly // 읽기 전용
      precision={0.5} // 0.5단위 반 별 표시
      max={5}
      sx={{
        fontSize: size,
        // gap이 중간만 벌어지는 이슈가...
        gap: '2px',
        /* 채워진/빈 별 색상 */
        '& .MuiRating-iconFilled': { color: '#E3E32D' },
        '& .MuiRating-iconEmpty': { color: '#949480' },
      }}
    />
  </div>
);

export default StarRating;
