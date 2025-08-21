import Box from '@/components/Box';
import AlramDropdownItem from '@/layout/components/AlramDropdownItem';
import { useGetAlarmList } from '@/layout/hooks/useAlarm';

const AlarmDropdown = () => {
  const { data } = useGetAlarmList();
  const alarmList = data;
  return (
    <Box width="w-[300px]" height="h-[330px]" className="bg-white">
      <div className="my-2 flex w-full [transform:translateZ(0)] flex-col gap-2 overflow-y-scroll pr-1.5 pl-4 [will-change:transform] [contain:layout_paint]">
        {alarmList !== undefined && alarmList.length !== 0 ? (
          alarmList.map((alarm) => {
            return <AlramDropdownItem alarm={alarm} key={alarm.id} />;
          })
        ) : (
          <div className="text-[#666666} flex h-full w-full text-center">알림이 없습니다.</div>
        )}
      </div>
    </Box>
  );
};

export default AlarmDropdown;
