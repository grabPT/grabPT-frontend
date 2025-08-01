import Profile from '@/assets/images/HeaderProfile.png';
import Box from '@/components/Box';

const MyProposalsListItem = () => {
  return (
    <Box height="h-[75px]">
      <div className="flex w-full items-center justify-between pr-4 pl-3">
        <div className="flex gap-2.5">
          <img src={Profile} alt="제안서를 받은 요청자의 프로필이미지" className="h-12" />

          <div className="text-sm font-medium">
            <p className="text-base font-semibold">날다람주낢닮앗노 님께 제안</p>
            <span>10회</span>
            <span> | </span>
            <span className="text-button">480,000원</span>
          </div>
        </div>

        <div className="flex items-center">
          <span className="text-sm text-gray-500">대기 중</span>
          <div className={`ml-2 h-3 w-3 rounded-full bg-orange-400`} />
        </div>
      </div>
    </Box>
  );
};

export default MyProposalsListItem;
