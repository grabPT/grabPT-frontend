import { useNavigate } from 'react-router-dom';

import { urlFor } from '@/constants/routes';

import UserRequestHeader from './UserRequestHeader';

/*
전문가 요청현황 조회 시
리스트로 보이는 요청현황의
상태 카드 컴포넌트입니다.
이 컴포넌트는 요청현황의 상태를 카드 형태로 보줍니다.
*/
interface RequestsStatusCardProps {
  profileImage: string;
  nickName: string;
  location: string;
  requestDate: string;
  numbersOfpt: number;
  totalPrice: number;
  status: string;
  id: number;
}

const RequestsStatusCard = (props: RequestsStatusCardProps) => {
  const navigate = useNavigate();
  const navigateToRequestDetail = (requestId: number) => navigate(urlFor.requestDetail(requestId));

  return (
    <div
      onClick={() => navigateToRequestDetail(props.id)}
      className="flex h-[75px] w-[700px] cursor-pointer flex-row items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-xl transition-shadow duration-200 hover:shadow-lg"
    >
      <UserRequestHeader nickName={props.nickName} location={props.location} />
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-700">{props.numbersOfpt}회</span>
        <span className="text-gray-400">|</span>
        <span className="text-sm text-gray-700">{props.totalPrice.toLocaleString()}원</span>
        <div
          className={`ml-2 h-3 w-3 rounded-full ${
            props.status === '매칭완료' ? 'bg-green-500' : 'bg-orange-400'
          }`}
        ></div>
        <span className="text-sm text-gray-500">{props.status}</span>
      </div>
    </div>
  );
};

export default RequestsStatusCard;
