// 선택지 타입
export type AgeGroup = '10대' | '20대' | '30대' | '40대' | '50대 이상';
export type Gender = '여자' | '남자';

export type Day = '월' | '화' | '수' | '목' | '금' | '토' | '일';
export type TimeSlot =
  | '오전(06:00~12:00)'
  | '오후(12:00~15:00)'
  | '저녁(17:00~22:00)'
  | '심야(22:00~06:00)';
export const TIME_SLOT_LABELS: Record<TimeSlot, string> = {
  '오전(06:00~12:00)': '아침',
  '오후(12:00~15:00)': '점심',
  '저녁(17:00~22:00)': '저녁',
  '심야(22:00~06:00)': '심야',
};
export type Purpose =
  | '기초부터 배우기'
  | '스킬 향상'
  | '다이어트'
  | '체력 향상'
  | '대회 준비'
  | '자세 교정'
  | '기타';
//항목별 타
export const PURPOSES: readonly Purpose[] = [
  '기초부터 배우기',
  '스킬 향상',
  '다이어트',
  '체력 향상',
  '대회 준비',
  '자세 교정',
  '기타',
] as const;
export const AGES: readonly AgeGroup[] = ['10대', '20대', '30대', '40대', '50대 이상'] as const;
export const GENDERS: readonly Gender[] = ['여자', '남자'] as const;
export const DAYS: readonly Day[] = ['월', '화', '수', '목', '금', '토', '일'] as const;
export const TIMES: readonly TimeSlot[] = [
  '오전(06:00~12:00)',
  '오후(12:00~15:00)',
  '저녁(17:00~22:00)',
  '심야(22:00~06:00)',
] as const;
