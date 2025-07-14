//운동 종목
export const SportsType = {
  WEIGHT: '헬스',
  BOXING: '복싱',
  PILATES: '필라테스',
  GOLF: '골프',
  TENNIS: '테니스',
  SWIMMING: '수영',
  BADMINTON: '배드민턴',
  RUNNING: '런닝',
  CYCLE: '사이클',
  TABLETENNIS: '탁구',
} as const;

export type SportsType = (typeof SportsType)[keyof typeof SportsType];
