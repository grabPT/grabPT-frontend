import { Link } from 'react-router-dom';

import Box from '@/components/Box';
import { SportsType } from '@/types/SportsType';

const CategoryDropdown = () => {
  const sports = [...Object.values(SportsType)];
  return (
    <Box width="w-[181px] h-[330px]" className="bg-white">
      <div className="p-5">
        <header className="text-lg leading-[normal] font-extrabold">운동</header>
        <div className="mt-[18px] flex flex-col gap-[6px]">
          {sports.map((sport, idx) => (
            <Link
              to={`category/${sport}`}
              className="text-base leading-[normal] font-normal"
              key={idx}
            >
              {sport}
            </Link>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default CategoryDropdown;
