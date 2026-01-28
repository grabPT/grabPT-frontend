import { memo, useCallback, useMemo } from 'react';

import { useNavigate } from 'react-router-dom';

import Box from '@/components/Box';
import ROUTES from '@/constants/routes';
import { useLogout } from '@/features/Signup/hooks/useLogout';
import { useRoleStore } from '@/store/useRoleStore';
import { decodeBase64Utf8 } from '@/utils/decodeBaseUtf8';

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

  const { role } = useRoleStore();
  const isPro = role === 'PRO';

  const { mutate: logout } = useLogout();
  let refreshToken: string = '';

  const stage = import.meta.env.VITE_STAGE;
  if (stage == 'development' || stage == 'staging') {
    refreshToken = decodeBase64Utf8(localStorage.getItem('refreshToken'));
  }

  const navigateToMyInfo = useCallback(() => {
    if (isPro) navigate(ROUTES.MYPAGE.PRO);
    else navigate(ROUTES.MYPAGE.USER);
  }, [isPro, navigate]);

  const navigateToSettlement = useCallback(() => {
    if (isPro) navigate(ROUTES.PRO_SETTLEMENT);
    else navigate(ROUTES.USER_SETTLEMENT);
  }, [navigate, isPro]);

  /* isPro 변동 시에만 재계산 */
  const handleLogout = useCallback(() => {
    logout({ refreshToken });
  }, [logout, refreshToken]);

  const items = useMemo<Item[]>(
    () => [
      { label: '내정보', onClick: navigateToMyInfo },
      { label: isPro ? '정산 현황' : '결제 내역', onClick: navigateToSettlement },
      { label: '로그아웃', onClick: handleLogout },
    ],
    [navigateToMyInfo, isPro, navigateToSettlement, handleLogout],
  );

  return (
    <Box width="" height="" className="flex flex-col rounded-xl bg-white">
      {items.map(({ label, onClick }) => (
        <DropdownItem key={label} label={label} onClick={onClick} />
      ))}
    </Box>
  );
}

export default memo(ProfileDropdown);
