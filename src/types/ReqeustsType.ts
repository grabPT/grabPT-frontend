// 선택지 타입
export type AgeGroup = '10대' | '20대' | '30대' | '40대' | '50대 이상';
export type Gender = '여자' | '남자';
export type EGender = 'MALE' | 'FEMALE' | '';
//한국 성별 -> 영어 성별로 변환(만약 서버에서 한국어로 받는게 문제가 안되면 없애도 될듯)
export const mapKGenderToEnum = (g: '' | '남자' | '여자') =>
  g === '남자' ? 'MALE' : g === '여자' ? 'FEMALE' : '';

export const mapEGenderToEnum =  (g: '' | 'MALE' | 'FEMALE') =>
  g === 'MALE' ? '남자' : g === 'FEMALE' ? 'FEMALE' : '';

export type Day = '월' | '화' | '수' | '목' | '금' | '토' | '일';
export type TimeSlot =
  | '오전(06:00~12:00)'
  | '오후(12:00~15:00)'
  | '저녁(17:00~22:00)'
  | '심야(22:00~06:00)';

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
