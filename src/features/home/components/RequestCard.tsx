// import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { urlFor } from '@/constants/routes';
import UserRequestHeader from '@/features/Requests/components/UserRequestHeader';
import { TIME_SLOT_LABELS } from '@/types/ReqeustsType';
import type { Tags } from '@/types/Tags';

import Hashtag from './Hashtag';

// import type { RequestCardProps } from '@/features/home/types/request';

// const RequestCard: React.FC<RequestCardProps> = ({ nickname, region, center_name, tags, memo }) => {
//   return (
//     <div className="relative flex h-[258px] w-[400px] flex-shrink-0 flex-col justify-between rounded-[10px] bg-white p-4 shadow-md">
//       {/* 닫기 버튼 */}
//       <button className="absolute top-2 right-2 text-gray-400 hover:text-black" name="닫기버튼">
//         <X size={18} />
//       </button>

//       {/* 상단 정보 */}
//       <div className="flex gap-3">
//         <img
//           src={ProfileIcon}
//           alt="프로필"
//           className="h-[47px] w-[47px] rounded-full bg-neutral-200"
//         />
//         <div className="flex flex-col">
//           <p className="text-base font-bold">{nickname}</p>
//           <p className="text-xs text-gray-500">{region}</p>
//           <p className="text-xs font-semibold text-blue-700">{center_name}</p>
//         </div>
//       </div>

//       {/* 태그 */}
//       <ul className="mt-2 list-disc pl-4 text-xs text-gray-800">
//         {tags.map((tag, idx) => (
//           <li key={idx}>{tag}</li>
//         ))}
//       </ul>

//       {/* 메모 */}
//       <div className="mt-2 overflow-hidden rounded bg-gray-100 p-2 text-xs leading-snug text-gray-700">
//         {memo}
//       </div>
//     </div>
//   );
// };

// export default RequestCard;

interface RequestCardInMainProps {
  name?: string;
  address: string;
  tags: Tags;
  text: string;
  id: number;
}

const RequestCardInMain = ({ name, address, tags, text, id }: RequestCardInMainProps) => {
  const navigate = useNavigate();
  const daysPerWeek = `주 ${tags.daysPerWeek}회`;
  const tagsResult = [
    ...tags.cagtegoryName.split(' '),
    ...tags.availableTimes.map((time) => TIME_SLOT_LABELS[time]),
    daysPerWeek,
  ];
  //console.log(tagsResult);
  return (
    <div
      onClick={() => navigate(urlFor.requestDetail(id))}
      className="flex h-[220px] max-w-[340px] cursor-pointer flex-col gap-[12px] rounded-xl px-[10px] py-[15px] shadow-[4px_4px_10px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:scale-[1.02] lg:w-[320px] xl:w-[320px] 2xl:w-[340px]"
    >
      <UserRequestHeader nickName={name} address={address} />
      <div className="flex flex-wrap gap-[6px]">
        {tagsResult.map((tag, idx) => (
          <Hashtag key={idx} tag={tag} />
        ))}
      </div>
      <div className="h-[100px] w-[300px] rounded-md border border-[#B8B8B8]">
        <p className="p-1.5 text-[12px] text-[#525252]">{text}</p>
      </div>
    </div>
  );
};

export default RequestCardInMain;
