import clsx from 'clsx';

const SkeletonChatCard = () => {
  return (
    <div
      className={clsx(
        // h-20 (80px) 고정, 테두리 및 날짜 제거
        'flex h-20 w-full items-center px-5',
        'bg-background',
      )}
    >
      {/* 좌측: 원형 프로필 아바타 */}
      <div
        className={clsx(
          'animate-pulse bg-gray-200',
          // 40px(h-10) 원형, 텍스트와 간격(mr-3)
          'mr-3 h-10 w-10 flex-shrink-0 rounded-full',
        )}
      />

      {/* 중앙: 이름 및 메시지 */}
      <div className="flex flex-grow flex-col justify-center space-y-1.5">
        {/* 닉네임 */}
        <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />

        {/* 메시지 내용 */}
        <div className="h-3 w-48 animate-pulse rounded bg-gray-200" />
      </div>

      {/* 우측 날짜 영역 제거됨 */}
    </div>
  );
};

export default SkeletonChatCard;
