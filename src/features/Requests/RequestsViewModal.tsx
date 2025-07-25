import UserRequestHeader from './UserRequestHeader';

/*
'요청 현황'페이지에서 카드 클릭 시 보여지는 모달 입니다.
*/
interface RequestsViewModalProps {
  profileImage: string;
  nickName: string;
  location: string;
  requestDate: string;
  numbersOfpt: number;
  totalPrice: number;
  status: string;
  id: number;
  description: string;
  gender: string;
  age: string;
  preferredTime: string;
  preferstartDate: string;
  hashtags: string[];
  handleModalClose: () => void;
}

const RequestsViewModal = (props: RequestsViewModalProps) => {
  return(
    <div>
      <UserRequestHeader
        nickName={props.nickName}
        location={props.location}
      />
      <div>
        hashTag
      </div>
      <div>
        <p>{props.description}</p>
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default RequestsViewModal;