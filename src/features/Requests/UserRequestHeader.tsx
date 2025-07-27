/*
유저의 요청 현황 카드의 보여지는
이미지, 닉네임, 위치 정보 부분 컴포넌트 입니다.
*/
interface UserRequestHeaderProps {
  nickName: string;
  location: string;
}

const UserRequestHeader = ({ nickName, location }: UserRequestHeaderProps) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
        <svg className="h-6 w-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="flex w-[128px] flex-col">
        <h3 className="text-lg font-semibold text-gray-900">{nickName}</h3>
        <p className="text-[12px] text-gray-500">{location}</p>
      </div>
    </div>
  );
};

export default UserRequestHeader;
