interface CommentBoxprops {
  placeholder?: string;
  max?: number;
}

const CommentBox = ({ placeholder = '• 내용을 입력해주세요.', max = 700 }: CommentBoxprops) => {
  return (
    <div className="relative w-full">
      {/* 글자 수 카운터 */}
      <div className="text-right text-[14px]">0/{max}</div>

      {/* 입력 영역 */}
      {/* 추후 반응형 */}
      <textarea
        className="h-[433px] w-full resize-none rounded-[10px] border border-[#CCCCCC] bg-[#F5F5F5] p-4 text-[15px] placeholder:text-[#CCCCCC] focus:border-gray-400 focus:outline-none"
        placeholder={placeholder}
      />
    </div>
  );
};

export default CommentBox;
