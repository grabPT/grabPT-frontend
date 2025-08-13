import Box from '@/components/Box';
import AlramDropdownItem from '@/layout/components/AlramDropdownItem';
// import { usePostReadAlarm } from '@/layout/hooks/useAlarm';
import type { alarmType } from '@/layout/types/alarmType';

interface AlramDropdownProps {
  alarmList: alarmType[];
}

const AlarmDropdown = ({ alarmList }: AlramDropdownProps) => {
  return (
    <Box width="w-[300px]" height="h-[330px]" className="bg-white">
      <div className="mt-2 flex h-full w-full [transform:translateZ(0)] flex-col gap-4 overflow-y-scroll pr-1.5 pl-4 [will-change:transform] [contain:layout_paint]">
        {alarmList.map((alarm) => {
          return <AlramDropdownItem alarm={alarm} key={alarm.id} />;
        })}
      </div>
    </Box>
  );
};

export default AlarmDropdown;
