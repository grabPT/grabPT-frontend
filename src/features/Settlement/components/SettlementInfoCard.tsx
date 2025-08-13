interface ISettlementInfoCard {
  title: string;
  content: string;
  img: string;
}
export const SettlementInfoCard = ({ title, content, img }: ISettlementInfoCard) => {
  return (
    <div className="flex h-[6.0625rem] w-full items-center justify-between rounded-[0.625rem] bg-[#E6ECFF] p-5">
      <div className="flex flex-col items-start justify-center gap-3">
        <span className="font-semibold">{title}</span>
        <span className="text-2xl font-semibold text-[#003EFB]">{content}</span>
      </div>
      <img alt="적립 금액 이미지" src={img} />
    </div>
  );
};
