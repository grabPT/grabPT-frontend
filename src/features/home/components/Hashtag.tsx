interface HashtagProps {
  tag: string;
}

const Hashtag = ({ tag }: HashtagProps) => {
  return (
    <div className="flex h-[18px] w-[auto] items-center justify-center rounded-xl bg-[#C2D1FF] text-[10px]">
      <div className="px-[10px]">#{tag}</div>
    </div>
  );
};

export default Hashtag;
