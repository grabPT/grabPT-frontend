interface ITitleLine {
  title: string;
  text?: string;
  font?: string;
}

export const TitleLine = ({ title, text = 'text-2xl', font = 'font-semibold' }: ITitleLine) => {
  return (
    <div className={`flex w-full flex-col items-center justify-center gap-8`}>
      <span className={`w-full ${text} ${font}`}>{title}</span>
      <div className="mb-10 h-0.5 w-full bg-[#BBBB]"></div>
    </div>
  );
};
