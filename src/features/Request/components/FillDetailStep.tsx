import { useState } from 'react';

import CheckedButton from '@/components/CheckedButton';
import CommentBox from '@/components/CommentBox';

type AgeGroup = '10대' | '20대' | '30대' | '40대' | '50대 이상';
type Gender = '여자' | '남자';
type Day = '월' | '화' | '수' | '목' | '금' | '토' | '일';
type TimeSlot =
  | '오전(06:00~12:00)'
  | '오후(12:00~15:00)'
  | '저녁(17:00~22:00)'
  | '심야(22:00~06:00)';

const purposeList: string[] = [
  '기초부터 배우기',
  '스킬 향상',
  '다이어트',
  '체력 향상',
  '대회 준비',
  '자세 교정',
  '기타',
];
const ageList: AgeGroup[] = ['10대', '20대', '30대', '40대', '50대 이상'];
const genderList: Gender[] = ['여자', '남자'];
const dayList: Day[] = ['월', '화', '수', '목', '금', '토', '일'];
const timeList: TimeSlot[] = [
  '오전(06:00~12:00)',
  '오후(12:00~15:00)',
  '저녁(17:00~22:00)',
  '심야(22:00~06:00)',
];

const FillDetailStep = () => {
  /* 목적(다중) */
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
  const togglePurpose = (p: string) =>
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
          PT의 <span className="text-[var(--color-button)]">목적</span>이 무엇인가요?
        </h1>
        <div className="mt-6">
          <div className="flex gap-6">
            {purposeList.map((p) => (
              <CheckedButton
                key={p}
                isChecked={selectedPurposes.includes(p)}
                onClick={() => togglePurpose(p)}
              >
                {p}
              </CheckedButton>
            ))}
          </div>
          {/* 기타 선택 시 텍스트박스 렌더링 */}
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
          수강생의 <span className="text-[var(--color-button)]">연령대</span>
        </h1>
        <div className="mt-6 flex flex-wrap gap-2">
          {ageList.map((a) => (
            <CheckedButton key={a} isChecked={age === a} onClick={() => setAge(a)}>
              {a}
            </CheckedButton>
          ))}
        </div>
      </section>

      {/* 3. 수강생 성별 */}
      <section>
        <h1>
          수강생의 <span className="text-[var(--color-button)]">성별</span>
        </h1>
        <div className="mt-6 flex gap-2">
          {genderList.map((g) => (
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
          트레이너 <span className="text-[var(--color-button)]">선호 성별</span>
        </h1>
        <div className="mt-6 flex gap-2">
          {genderList.map((g) => (
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
          PT <span className="text-[var(--color-button)]">시작 희망일</span>
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
          가능 <span className="text-[var(--color-button)]">요일</span>
        </h1>
        <div className="mt-6 flex flex-wrap gap-2">
          {dayList.map((d) => (
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
          가능 <span className="text-[var(--color-button)]">시간대</span>
        </h1>
        <div className="mt-6 flex flex-wrap gap-2">
          {timeList.map((t) => (
            <CheckedButton key={t} isChecked={times.includes(t)} onClick={() => toggleTime(t)}>
              {t}
            </CheckedButton>
          ))}
        </div>
      </section>

      {/* 8. 세부 요청사항 */}
      <section>
        <h1>
          세부 <span className="text-[var(--color-button)]">요청사항</span>
        </h1>
        <CommentBox />
      </section>
    </div>
  );
};

export default FillDetailStep;
