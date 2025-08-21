import { useEffect, useState } from 'react';

import type { userInfoType } from '@/features/Contract/types/postContractType';

interface UserInformationFormProps {
  isCanEdit: boolean;
  defaultValues?: userInfoType;
}

const UserInformationForm = ({ isCanEdit, defaultValues }: UserInformationFormProps) => {
  const baseInputClass = 'h-10 w-full rounded-md border px-3 outline-none transition';
  const editableClass = 'border-gray-300 bg-white focus:border-blue-500';
  const readOnlyClass = 'border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed';

  // date 인풋에 들어갈 값 정규화(YYYY-MM-DD)
  const birthValue =
    typeof defaultValues?.birth === 'string' && defaultValues.birth.length > 0
      ? defaultValues.birth.slice(0, 10)
      : '';

  const [gender, setGender] = useState<'MALE' | 'FEMALE' | null>(defaultValues?.gender ?? null);
  useEffect(() => {
    setGender(defaultValues?.gender ?? null);
  }, [defaultValues?.gender]);

  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-4 text-sm">
      <label className="self-center">성명</label>
      <input
        type="text"
        placeholder="이름"
        name="name"
        readOnly={!isCanEdit}
        defaultValue={defaultValues?.name ?? ''}
        className={`${baseInputClass} ${isCanEdit ? editableClass : readOnlyClass}`}
      />

      <label className="self-center">생년월일</label>
      <input
        aria-label="날짜"
        name="birth"
        type="date"
        readOnly={!isCanEdit}
        defaultValue={birthValue}
        className={`${baseInputClass} ${isCanEdit ? editableClass : readOnlyClass}`}
      />

      <label className="self-center">연락처</label>
      <input
        type="tel"
        placeholder="010-0000-0000"
        name="phoneNumber"
        readOnly={!isCanEdit}
        defaultValue={defaultValues?.phoneNumber ?? ''}
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
            value="MALE"
            className="peer sr-only"
            readOnly={!isCanEdit}
            checked={gender === 'MALE'}
            onChange={() => setGender('MALE')}
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
            value="FEMALE"
            className="peer sr-only"
            readOnly={!isCanEdit}
            checked={gender === 'FEMALE'}
            onChange={() => setGender('FEMALE')}
          />
          <span className="inline-block h-5 w-5 rounded-full border-2 border-gray-500 peer-checked:border-[6px] peer-checked:border-blue-600" />
          여
        </label>
      </div>

      <label className="self-center">주소</label>
      <input
        type="text"
        placeholder="주소"
        name="address"
        readOnly={!isCanEdit}
        defaultValue={defaultValues?.address ?? ''}
        className={`${baseInputClass} ${isCanEdit ? editableClass : readOnlyClass}`}
      />
    </div>
  );
};

export default UserInformationForm;
