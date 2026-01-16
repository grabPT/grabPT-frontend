import clsx from 'clsx';

const SkeletonChatCard = () => {
  return (
    <div className={clsx('flex h-20 w-full items-center px-5', 'bg-background')}>
      <div
        className={clsx('animate-pulse bg-gray-200', 'mr-3 h-10 w-10 flex-shrink-0 rounded-full')}
      />

      <div className="flex flex-grow flex-col justify-center space-y-1.5">
        <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-48 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
};

export default SkeletonChatCard;
