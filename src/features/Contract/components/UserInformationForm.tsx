interface UserInformationFormProps {
  isCanEdit: boolean;
}

const UserInformationForm = ({ isCanEdit }: UserInformationFormProps) => {
  const baseInputClass = 'h-10 w-full rounded-md border px-3 outline-none transition';
  const editableClass = 'border-gray-300 bg-white focus:border-blue-500';
  const readOnlyClass = 'border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed';

  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-4 text-sm">
      <label className="self-center">성명</label>
      <input
        type="text"
        placeholder="이름"
        readOnly={!isCanEdit}
        className={`${baseInputClass} ${isCanEdit ? editableClass : readOnlyClass}`}
      />

      <label className="self-center">생년월일</label>
      <input
        aria-label="날짜"
        type="date"
        readOnly={!isCanEdit}
        className={`${baseInputClass} ${isCanEdit ? editableClass : readOnlyClass}`}
      />

      <label className="self-center">연락처</label>
      <input
        type="tel"
        placeholder="010-0000-0000"
        readOnly={!isCanEdit}
        className={`${baseInputClass} ${isCanEdit ? editableClass : readOnlyClass}`}
      />

      <label className="self-center">성별</label>
      <div className="flex items-center gap-6">
        {/* 남자 */}
        <label
          className={`flex items-center gap-1 ${!isCanEdit ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          <input
            type="radio"
            name="gender"
            value="male"
            className="peer sr-only"
            defaultChecked
            disabled={!isCanEdit}
          />
          <span className="inline-block h-5 w-5 rounded-full border-2 border-gray-500 peer-checked:border-[6px] peer-checked:border-blue-600" />
          남
        </label>

        {/* 여자 */}
        <label
          className={`flex items-center gap-1 ${!isCanEdit ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          <input
            type="radio"
            name="gender"
            value="female"
            className="peer sr-only"
            disabled={!isCanEdit}
          />
          <span className="inline-block h-5 w-5 rounded-full border-2 border-gray-500 peer-checked:border-[6px] peer-checked:border-blue-600" />
          여
        </label>
      </div>

      <label className="self-center">주소</label>
      <input
        type="text"
        placeholder="API 연동해야 함"
        readOnly={!isCanEdit}
        className={`${baseInputClass} ${isCanEdit ? editableClass : readOnlyClass}`}
      />
    </div>
  );
};

export default UserInformationForm;
