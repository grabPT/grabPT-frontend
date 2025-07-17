import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

export type TabItem = {
  label: string;
  to: string;
};

interface TabsProps {
  items: TabItem[];
}

const Tabs = ({ items }: TabsProps) => {
  return (
    <div className="flex w-full justify-center">
      {items.map(({ label, to }) => (
        <NavLink
          key={to}
          to={to}
          end
          className={({ isActive }) =>
            clsx(
              'h-[25px] w-36 border-b-2 border-[#B3B3B3] pb-7 text-center text-[14px] font-medium whitespace-nowrap',
              isActive ? 'border-black text-black' : 'text-[#B3B3B3]',
            )
          }
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
};

export default Tabs;
