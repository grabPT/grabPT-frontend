interface ITitleLine {
  title: string;
  text?: string;
  font?: string;
}

export const TitleLine = ({ title, text = 'text-2xl', font = 'font-semibold' }: ITitleLine) => {
  return (
    <div className={`items-center justify-center`}>
      <span className={`w-full ${text} ${font}`}>{title}</span>
    </div>
  );
};
