import { Skeleton } from '@mui/material';

const ProProfileSkeleton = () => {
  return (
    <div className="mx-auto mt-16 flex max-w-[600px] flex-col items-center gap-12">
      {/* 프로필 카드 */}
      <div className="flex justify-center px-[77px]">
        <Skeleton className="h-[180px] w-[300px] rounded-xl" />
      </div>

      {/* 전문가 소개 */}
      <div className="w-full">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-12" />
        </div>
        <hr className="mt-[10px] border-t-2 border-[#B8B8B8]" />
        <div className="mt-[45px] flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-full" />
          ))}
        </div>
      </div>

      {/* 소개 사진 */}
      <div className="w-full">
        <div className="flex w-full justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-12" />
        </div>
        <hr className="mt-[10px] border-t-2 border-[#B8B8B8]" />
        <div className="mt-6 grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[150px] w-full rounded-lg" />
          ))}
        </div>
      </div>

      {/* 프로그램 가격 */}
      <div className="w-full">
        <div className="flex w-full justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-12" />
        </div>
        <hr className="mt-[10px] mb-[45px] border-t-2 border-[#B8B8B8]" />
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full rounded-md" />
          ))}
        </div>
      </div>

      {/* 센터 */}
      <div className="w-full">
        <div className="flex w-full justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-12" />
        </div>
        <hr className="mt-[10px] mb-[45px] border-t-2 border-[#B8B8B8]" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-[80px] w-full rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default ProProfileSkeleton;
