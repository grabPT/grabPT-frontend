interface HashtagProps {
  tag: string;
}

const Hashtag = ({ tag }: HashtagProps) => {
  return (
    <div className="flex h-[24px] w-[auto] items-center justify-center rounded-xl bg-[#C2D1FF] text-[10px] text-blue-700">
      <div className="px-[10px] font-semibold">#{tag}</div>
    </div>
  );
};

export default Hashtag;
