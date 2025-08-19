import { useNavigate } from 'react-router-dom';

import chatImage from '@/assets/images/ChatImage.svg';
import fileImage from '@/assets/images/FileImage.svg';
import PaymentImage from '@/assets/images/PaymentImage.svg';
import SuccessImage from '@/assets/images/SuccessImage.svg';
import textImage from '@/assets/images/TextImage.svg';
import { useTimeAgo } from '@/hooks/useTimaAgo';
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

  const IMAGE_BY_TYPE: Record<string, string> = {
    MESSAGE: chatImage,
    CONTRACT: textImage,
    SUGGESTION: fileImage,
    REQUESTION: fileImage,
    REQUEST: fileImage, // 혹시 백엔드가 REQUEST로 보내는 경우 대비
    PAYMENT: PaymentImage,
    SUCCESS: SuccessImage,
  };

  const imagePath = IMAGE_BY_TYPE[alarm.type] ?? textImage;

  const timeAgo = useTimeAgo(alarm.sentAt); // 예: "3분 전", "어제", "5일 전"

  return (
    <div
      className="flex cursor-pointer justify-between gap-3 px-2 py-2 hover:bg-gray-300"
      onClick={handleClick}
    >
      <img src={imagePath} alt="알람" className="h-full w-7" />

      <div className="flex-1">
        <div className="flex justify-between">
          <h1 className="text-[14px] font-semibold">{alarm.title}</h1>
          <p className="mt-0.5 text-[10px] font-medium text-[#666666]">{timeAgo}</p>
        </div>
        <p className="text-[10px] leading-none font-medium text-[#666666]">{alarm.content}</p>
      </div>
    </div>
  );
};

export default AlramDropdownItem;
