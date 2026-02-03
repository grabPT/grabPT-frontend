import { Link } from 'react-router-dom';

import Box from '@/components/Box';
import LoadingSpinner from '@/components/LoadingSpinner';
import ROUTES from '@/constants/routes';
import { useGetUnreadAlarmList } from '@/features/Alarm/hooks/useAlarm';
import AlramDropdownItem from '@/layout/components/AlramDropdownItem';

const AlarmDropdown = () => {
  const { data, isLoading, isError, refetch } = useGetUnreadAlarmList();
  const alarmList = data?.result;

  return (
    <Box width="w-[300px]" height="h-[330px]" className="bg-white">
      <div className="my-2 flex h-full w-full [transform:translateZ(0)] flex-col gap-2 overflow-y-scroll pr-1.5 pl-4 [will-change:transform] [contain:layout_paint]">
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mb-2 h-8 w-8 text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
            <span className="text-sm">새로운 알림이 없습니다.</span>
          </div>
        )}
        <Link
          to={ROUTES.ALARM}
          className="group flex w-full items-center justify-center gap-1 border-t border-gray-100 py-3 text-sm font-medium text-gray-500 hover:text-gray-900"
        >
          <span className="group-hover:underline">전체보기</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </Box>
  );
};

export default AlarmDropdown;
