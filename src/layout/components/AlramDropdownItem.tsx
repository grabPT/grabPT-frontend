import { useNavigate } from 'react-router-dom';

import chatImage from '@/assets/images/ChatImage.svg';
import fileImage from '@/assets/images/FileImage.svg';
import textImage from '@/assets/images/TextImage.svg';
// import { useTimeAgo } from '@/hooks/useTimaAgo';
import { usePatchReadAlarm } from '@/layout/hooks/useAlarm';
import type { alarmType } from '@/layout/types/alarmType';

interface AlarmDropdownItemProps {
  alarm: alarmType;
}
const AlramDropdownItem = ({ alarm }: AlarmDropdownItemProps) => {
  const navigate = useNavigate();

  const { mutate: postReadAlarm } = usePatchReadAlarm(alarm.id);

  const handleClick = () => {
    postReadAlarm(alarm.id);
    navigate(alarm.redirectUrl);
  };

  const imagePath =
    alarm.type === 'MESSAGE' ? chatImage : alarm.type === 'CONTRACT' ? fileImage : textImage;

  // const timeAgo = useTimeAgo(alarm.createdAt); // 예: "3분 전", "어제", "5일 전"

  return (
    <div
      className="flex cursor-pointer justify-between gap-3 px-2 py-2 hover:bg-gray-300"
      onClick={handleClick}
    >
      <img src={imagePath} alt="알람" className="h-full w-7" />

      <div className="flex-1">
        <div className="flex justify-between">
          <h1 className="text-[14px] font-semibold">{alarm.title}</h1>
          <p className="mt-0.5 text-[10px] font-medium text-[#666666]">{alarm.createdAt}</p>
        </div>
        <p className="text-[10px] leading-none font-medium text-[#666666]">{alarm.content}</p>
      </div>
    </div>
  );
};

export default AlramDropdownItem;
