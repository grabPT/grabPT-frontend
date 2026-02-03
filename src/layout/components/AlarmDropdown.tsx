import { Link } from 'react-router-dom';

import ArrowIcon from '@/assets/icons/ArrowIcon';
import NoAlarmIcon from '@/assets/icons/NoAlarmIcon';
import Box from '@/components/Box';
import LoadingSpinner from '@/components/LoadingSpinner';
import ROUTES from '@/constants/routes';
import { useGetUnreadAlarmList } from '@/features/Alarm/hooks/useAlarm';
import AlramDropdownItem from '@/layout/components/AlramDropdownItem';

const AlarmDropdown = () => {
  const { data, isLoading, isError, refetch } = useGetUnreadAlarmList();
  const alarmList = data?.result;

  return (
    <Box className="min-h-[330px] w-[300px] bg-white">
      <div className="my-2 flex w-full flex-1 [transform:translateZ(0)] flex-col gap-2 overflow-y-scroll pr-1.5 pl-4 [will-change:transform] [contain:layout_paint]">
        {isLoading ? (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <LoadingSpinner className="h-8 w-8" />
            <span className="mt-2 text-sm text-gray-500">로딩 중...</span>
          </div>
        ) : isError ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2">
            <div className="text-center text-sm text-gray-500">알림을 불러오는데 실패했습니다.</div>
            <button
              onClick={() => refetch()}
              className="rounded bg-[#003efb] px-3 py-1 text-xs text-white hover:bg-[#1537d9]"
            >
              다시 시도
            </button>
          </div>
        ) : alarmList !== undefined && alarmList.length !== 0 ? (
          alarmList.map((alarm) => {
            return <AlramDropdownItem alarm={alarm} key={alarm.alarmId} />;
          })
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-[#666666]">
            <NoAlarmIcon className="mb-2 h-8 w-8 text-gray-300" />
            <span className="text-sm">새로운 알림이 없습니다.</span>
          </div>
        )}
        <Link
          to={ROUTES.ALARM}
          className="group flex w-full items-center justify-center gap-1 border-t border-gray-100 py-3 text-sm font-medium text-gray-500 hover:text-gray-900"
        >
          <span className="group-hover:underline">전체보기</span>
          <ArrowIcon direction="right" className="h-4 w-4" />
        </Link>
      </div>
    </Box>
  );
};

export default AlarmDropdown;
