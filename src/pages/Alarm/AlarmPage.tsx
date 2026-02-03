import ChevronArrowIcon from '@/assets/icons/ChevronArrowIcon';
import LoadingSpinner from '@/components/LoadingSpinner';
import AlarmSkeleton from '@/features/Alarm/components/AlarmSkeleton';
import { useGetAllAlarmList } from '@/features/Alarm/hooks/useAlarm';
import AlramDropdownItem from '@/layout/components/AlramDropdownItem';

const AlarmPage = () => {
  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetAllAlarmList(20);

  const alarmList = data?.pages.flatMap((page) => page.result.content);

  return (
    <div className="layout-sm-container py-section-sm min-h-screen">
      <h1 className="mb-6 text-2xl font-bold">전체 알림</h1>

      {isLoading ? (
        <div className="flex h-64 w-full items-center justify-center">
          <LoadingSpinner className="h-12 w-12" />
        </div>
      ) : isError ? (
        <div className="flex h-64 w-full flex-col items-center justify-center text-gray-500">
          알림을 불러오는데 실패했습니다.
        </div>
      ) : alarmList && alarmList.length > 0 ? (
        <>
          <div className="flex flex-col gap-2">
            {alarmList.map((alarm, index) => (
              <AlramDropdownItem key={`${alarm.alarmId}-${alarm.sentAt}-${index}`} alarm={alarm} />
            ))}
          </div>
          {hasNextPage && (
            <div className="mt-2">
              {isFetchingNextPage ? (
                Array.from({ length: 5 }).map((_, index) => <AlarmSkeleton key={index} />)
              ) : (
                <button
                  onClick={() => fetchNextPage()}
                  className="flex w-full items-center justify-center gap-1 border-t border-gray-100 py-4 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                >
                  <span className="text-sm">더 보기</span>
                  <ChevronArrowIcon direction="down" className="h-5 w-5" />
                </button>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="flex h-64 w-full flex-col items-center justify-center text-gray-500">
          알림이 없습니다.
        </div>
      )}
    </div>
  );
};

export default AlarmPage;
