import { memo, useCallback, useMemo } from 'react';

import { useNavigate } from 'react-router-dom';

import Box from '@/components/Box';
import ROUTES from '@/constants/routes';
import { useUserRoleStore } from '@/store/useUserRoleStore';

type Item = {
  label: string;
  onClick: () => void;
};

/* 개별 항목 (스타일 동일) */
const DropdownItem = memo(function DropdownItem({ label, onClick }: Item) {
  return (
    <div
      onClick={onClick}
      className="flex h-[53px] w-[124px] cursor-pointer items-center pl-[30px]"
    >
      <span className="leading-normal font-semibold text-[#374151]">{label}</span>
    </div>
  );
});

function ProfileDropdown() {
  const navigate = useNavigate();
  const { isExpert, LogOut } = useUserRoleStore();

  const navigateToMypage = useCallback(() => {
    if (isExpert) navigate(ROUTES.MYPAGE.EXPERT);
    else navigate(ROUTES.MYPAGE.USER);
  }, [isExpert, navigate]);

  /* isExpert 변동 시에만 재계산 */
  const items = useMemo<Item[]>(() => {
    const base: Item[] = [
      { label: '내정보', onClick: navigateToMypage },
      { label: '로그아웃', onClick: LogOut },
    ];

    return isExpert ? [base[0], { label: '정산 관리', onClick: navigateToMypage }, base[1]] : base;
  }, [isExpert, navigateToMypage, LogOut]);

  return (
    <Box width="" height="" className="flex flex-col rounded-xl bg-white">
      {items.map(({ label, onClick }) => (
        <DropdownItem key={label} label={label} onClick={onClick} />
      ))}
    </Box>
  );
}

export default memo(ProfileDropdown);
