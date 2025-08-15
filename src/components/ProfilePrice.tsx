interface ProfilePriceProps {
  count?: number;
  price?: number | null;
}

const ProfilePrice = ({ count, price }: ProfilePriceProps) => {
  return (
    <div className="flex h-[50px] w-[520px] items-center gap-[10px]">
      <span className="flex h-[50px] w-[85px] items-center justify-center rounded-[10px] border border-[#BABABA] px-2">
        {count}
      </span>
      <span className="text-[18px] font-semibold">회</span>
      <span className="flex h-[50px] w-[260px] items-center justify-center rounded-[10px] border border-[#BABABA] px-2">
        {price}
      </span>
      <span className="text-[18px] font-semibold">원</span>
    </div>
  );
};

export default ProfilePrice;
