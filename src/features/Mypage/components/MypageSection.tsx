import CommentBox from '@/components/CommentBox';

interface MypageSectionProps {
  title: string;
}

const MypageSection = ({ title }: MypageSectionProps) => {
  return (
    <section className="w-full">
      {/* 타이틀 */}
      <h2 className="mb-4 text-[33px] font-semibold">{title}</h2>
      <hr className="mb-6 border-t border-[#d9d9d9]" />
      <CommentBox value={''} onChange={() => {}} />
    </section>
  );
};

export default MypageSection;
