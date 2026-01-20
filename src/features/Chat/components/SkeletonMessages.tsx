const SkeletonMessages = () => {
  return (
    <div className="flex w-full flex-col gap-4 py-4">
      {/* 상대방 메시지 (왼쪽) */}
      <div className="flex items-center justify-start gap-4 px-5">
        {/* 프로필 이미지 스켈레톤 */}
        <div className="h-12 w-12 shrink-0 animate-pulse rounded-full bg-gray-200" />
        {/* 말풍선 */}
        <div className="flex flex-col gap-1">
          <div className="h-12 w-48 animate-pulse rounded-t-xl rounded-br-xl rounded-bl-none bg-gray-200" />
        </div>
      </div>

      {/* 내 메시지 (오른쪽) */}
      <div className="flex items-center justify-end gap-4 px-5">
        {/* 말풍선 */}
        <div className="h-10 w-40 animate-pulse rounded-t-xl rounded-br-none rounded-bl-xl bg-blue-100/50" />
        {/* 내 프로필 이미지 스켈레톤 (요청사항 반영) */}
        <div className="h-12 w-12 shrink-0 animate-pulse rounded-full bg-blue-100/50" />
      </div>

      {/* 상대방 메시지 (긴 텍스트) */}
      <div className="flex items-center justify-start gap-4 px-5">
        <div className="h-12 w-12 shrink-0 animate-pulse rounded-full bg-gray-200" />
        <div className="flex flex-col gap-1">
          <div className="h-20 w-64 animate-pulse rounded-t-xl rounded-br-xl rounded-bl-none bg-gray-200" />
        </div>
      </div>

      {/* 내 메시지 (연속) */}
      <div className="flex items-center justify-end gap-4 px-5">
        <div className="h-12 w-56 animate-pulse rounded-t-xl rounded-br-none rounded-bl-xl bg-blue-100/50" />
        <div className="h-12 w-12 shrink-0 animate-pulse rounded-full bg-blue-100/50" />
      </div>

      {/* 상대방 메시지 (왼쪽) */}
      <div className="flex items-center justify-start gap-4 px-5">
        {/* 프로필 이미지 스켈레톤 */}
        <div className="h-12 w-12 shrink-0 animate-pulse rounded-full bg-gray-200" />
        {/* 말풍선 */}
        <div className="flex flex-col gap-1">
          <div className="h-12 w-48 animate-pulse rounded-t-xl rounded-br-xl rounded-bl-none bg-gray-200" />
        </div>
      </div>

      {/* 내 메시지 (오른쪽) */}
      <div className="flex items-center justify-end gap-4 px-5">
        {/* 말풍선 */}
        <div className="h-10 w-40 animate-pulse rounded-t-xl rounded-br-none rounded-bl-xl bg-blue-100/50" />
        {/* 내 프로필 이미지 스켈레톤 (요청사항 반영) */}
        <div className="h-12 w-12 shrink-0 animate-pulse rounded-full bg-blue-100/50" />
      </div>

      {/* 상대방 메시지 (긴 텍스트) */}
      <div className="flex items-center justify-start gap-4 px-5">
        <div className="h-12 w-12 shrink-0 animate-pulse rounded-full bg-gray-200" />
        <div className="flex flex-col gap-1">
          <div className="h-20 w-64 animate-pulse rounded-t-xl rounded-br-xl rounded-bl-none bg-gray-200" />
        </div>
      </div>

      {/* 내 메시지 (연속) */}
      <div className="flex items-center justify-end gap-4 px-5">
        <div className="h-12 w-56 animate-pulse rounded-t-xl rounded-br-none rounded-bl-xl bg-blue-100/50" />
        <div className="h-12 w-12 shrink-0 animate-pulse rounded-full bg-blue-100/50" />
      </div>
    </div>
  );
};

export default SkeletonMessages;
