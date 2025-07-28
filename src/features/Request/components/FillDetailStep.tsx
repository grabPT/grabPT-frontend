// src/features/Request/FillDetailStep.tsx
import { useState } from 'react';

import CheckedButton from '@/components/CheckedButton';
import CommentBox from '@/components/CommentBox';
import {
  AGES,
  type AgeGroup,
  DAYS,
  type Day,
  GENDERS,
  type Gender,
  PURPOSES,
  TIMES,
  type TimeSlot,
} from '@/types/ReqeustsType';

// 유틸 타입
type Purpose = (typeof PURPOSES)[number];

const FillDetailStep = () => {
  /* 목적(다중) */
  const [selectedPurposes, setSelectedPurposes] = useState<Purpose[]>([]);
  const togglePurpose = (p: Purpose) =>
    setSelectedPurposes((prev) => (prev.includes(p) ? prev.filter((v) => v !== p) : [...prev, p]));
  const etcSelected = selectedPurposes.includes('기타');

  /* 연령대(단일) */
  const [age, setAge] = useState<AgeGroup | null>(null);

  /* 수강생 성별(단일) */
  const [studentGender, setStudentGender] = useState<Gender | null>(null);

  /* 트레이너 선호 성별(단일) */
  const [trainerGender, setTrainerGender] = useState<Gender | null>(null);

  /* 가능 요일(다중) */
  const [days, setDays] = useState<Day[]>([]);
  const toggleDay = (d: Day) =>
    setDays((prev) => (prev.includes(d) ? prev.filter((v) => v !== d) : [...prev, d]));

  /* 가능 시간대(다중) */
  const [times, setTimes] = useState<TimeSlot[]>([]);
  const toggleTime = (t: TimeSlot) =>
    setTimes((prev) => (prev.includes(t) ? prev.filter((v) => v !== t) : [...prev, t]));

  /* PT 시작 희망일 */
  const [startDate, setStartDate] = useState<string>('');

  return (
    <div className="flex w-full flex-col gap-20 text-left text-4xl font-bold">
      {/* 1. PT 목적 */}
      <section>
        <h1>
          PT의 <span className="text-button">목적</span>이 무엇인가요?
        </h1>
        <div className="mt-6">
          <div className="flex gap-6">
            {PURPOSES.map((p) => (
              <CheckedButton
                key={p}
                isChecked={selectedPurposes.includes(p)}
                onClick={() => togglePurpose(p)}
              >
                {p}
              </CheckedButton>
            ))}
          </div>
          {etcSelected && (
            <textarea
              className="mt-4 h-[180px] w-full resize-none rounded-[10px] border border-[#CCCCCC] bg-[#F5F5F5] p-4 text-[15px] placeholder:text-[#CCCCCC] focus:border-gray-400 focus:outline-none"
              placeholder="세부 내용을 입력해주세요"
            />
          )}
        </div>
      </section>

      {/* 2. 연령대 */}
      <section>
        <h1>
          수강생의 <span className="text-button">연령대</span>
        </h1>
        <div className="mt-6 flex flex-wrap gap-2">
          {AGES.map((a) => (
            <CheckedButton key={a} isChecked={age === a} onClick={() => setAge(a)}>
              {a}
            </CheckedButton>
          ))}
        </div>
      </section>

      {/* 3. 수강생 성별 */}
      <section>
        <h1>
          수강생의 <span className="text-button">성별</span>
        </h1>
        <div className="mt-6 flex gap-2">
          {GENDERS.map((g) => (
            <CheckedButton
              key={g}
              isChecked={studentGender === g}
              onClick={() => setStudentGender(g)}
            >
              {g}
            </CheckedButton>
          ))}
        </div>
      </section>

      {/* 4. 트레이너 선호 성별 */}
      <section>
        <h1>
          트레이너 <span className="text-button">선호 성별</span>
        </h1>
        <div className="mt-6 flex gap-2">
          {GENDERS.map((g) => (
            <CheckedButton
              key={g}
              isChecked={trainerGender === g}
              onClick={() => setTrainerGender(g)}
            >
              {g}
            </CheckedButton>
          ))}
        </div>
      </section>

      {/* 5. PT 시작 희망일 */}
      <section>
        <h1>
          PT <span className="text-button">시작 희망일</span>
        </h1>
        <input
          type="date"
          aria-label="PT 시작 희망일"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mt-6 rounded-[10px] border border-[#CCCCCC] p-3 text-xl focus:border-gray-400 focus:outline-none"
        />
      </section>

      {/* 6. 가능 요일 */}
      <section>
        <h1>
          가능 <span className="text-button">요일</span>
        </h1>
        <div className="mt-6 flex flex-wrap gap-2">
          {DAYS.map((d) => (
            <CheckedButton
              key={d}
              width="w-[56px]"
              isChecked={days.includes(d)}
              onClick={() => toggleDay(d)}
            >
              {d}
            </CheckedButton>
          ))}
        </div>
      </section>

      {/* 7. 가능 시간대 */}
      <section>
        <h1>
          가능 <span className="text-button">시간대</span>
        </h1>
        <div className="mt-6 flex flex-wrap gap-2">
          {TIMES.map((t) => (
            <CheckedButton key={t} isChecked={times.includes(t)} onClick={() => toggleTime(t)}>
              {t}
            </CheckedButton>
          ))}
        </div>
      </section>

      {/* 8. 세부 요청사항 */}
      <section>
        <h1>
          세부 <span className="text-button">요청사항</span>
        </h1>
        <CommentBox />
      </section>
    </div>
  );
};

export default FillDetailStep;
