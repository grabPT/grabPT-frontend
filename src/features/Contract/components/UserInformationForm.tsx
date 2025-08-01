const UserInformationForm = () => {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-4 text-sm">
      <label className="self-center">성명</label>
      <input
        type="text"
        placeholder="이름"
        className="focus:border-button h-10 w-full rounded-md border border-gray-300 bg-white px-3 outline-none"
      />

      <label className="self-center">생년월일</label>
      <input
        aria-label="날짜"
        type="date"
        className="focus:border-button h-10 w-full rounded-md border border-gray-300 bg-white px-3 outline-none"
      />

      <label className="self-center">연락처</label>
      <input
        type="tel"
        placeholder="010-0000-0000"
        className="focus:border-button h-10 w-full rounded-md border border-gray-300 bg-white px-3 outline-none"
      />

      <label className="self-center">성별</label>
      <div className="flex items-center gap-6">
        {/* 남자 */}
        <label className="flex items-center gap-1">
          <input type="radio" name="gender" value="male" className="peer sr-only" defaultChecked />
          <span className="inline-block h-5 w-5 rounded-full border-2 border-gray-500 peer-checked:border-[6px] peer-checked:border-blue-600" />
          남
        </label>

        {/* 여자 */}
        <label className="flex items-center gap-1">
          <input type="radio" name="gender" value="female" className="peer sr-only" />
          <span className="inline-block h-5 w-5 rounded-full border-2 border-gray-500 peer-checked:border-[6px] peer-checked:border-blue-600" />
          여
        </label>
      </div>

      <label className="self-center">주소</label>
      <input
        type="text"
        placeholder="API 연동해야 함"
        className="focus:border-button h-10 w-full rounded-md border border-gray-300 bg-white px-3 outline-none"
      />
    </div>
  );
};

export default UserInformationForm;
