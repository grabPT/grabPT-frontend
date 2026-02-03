const AlarmSkeleton = () => {
  return (
    <div className="flex w-full gap-3 py-2">
      <div className="h-10 w-10 rounded bg-gray-200" /> {/* Title */}
      <div className="flex flex-1 flex-col justify-between gap-2">
        <div className="h-4 w-1/4 rounded bg-gray-200" /> {/* Content line 1 */}
        <div className="flex justify-between">
          <div className="h-4 w-1/2 rounded bg-gray-200" /> {/* Content line 2 */}
          <div className="h-4 w-12 rounded bg-gray-200" /> {/* Content line 2 */}
        </div>
      </div>
    </div>
  );
};

export default AlarmSkeleton;
