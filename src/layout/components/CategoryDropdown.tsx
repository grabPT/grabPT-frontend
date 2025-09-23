import { Link } from 'react-router-dom';

import Box from '@/components/Box';
import { urlFor } from '@/constants/routes';
import { SPORTS } from '@/constants/sports';

const CategoryDropdown = () => {
  return (
    <Box width="w-[181px]" height="h-[330px]" className="bg-white">
      <div className="p-5">
        <header className="text-lg leading-[normal] font-extrabold">운동</header>
        <div className="mt-[18px] flex flex-col gap-[6px]">
          {SPORTS.map((sport, idx) => (
            <Link
              to={urlFor.categoryDetail(sport.slug)}
              className="text-base leading-[normal] font-normal"
              key={idx}
            >
              {sport.label}
            </Link>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default CategoryDropdown;
