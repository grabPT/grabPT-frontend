import Rating from '@mui/material/Rating';
import clsx from 'clsx';

interface StarRatingProps {
  rating: number;
  size?: number;
  fontSize?: number;
}

const StarRating = ({ rating, size, fontSize }: StarRatingProps) => {
  const fontSizeClass = `text-[${fontSize}px]`;
  return (
    <div className="flex items-end gap-[5px] leading-0">
      <Rating
        value={rating}
        readOnly
        precision={0.5}
        max={5}
        sx={{
          fontSize: size,
          '& .MuiRating-iconFilled': { color: '#E3E32D' },
        }}
      />
      <p className={clsx('text-[8px] leading-none font-bold', fontSizeClass)}>{rating}</p>
    </div>
  );
};

export default StarRating;
