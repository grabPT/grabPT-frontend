export const SportsType = {
  WEIGHT: '헬스',
  BOXING: '복싱',
  SOCCER: '축구',
  BASKETBALL: '농구',
  TENNIS: '테니스',
  SWIMMING: '수영',
  BADMINTON: '배드민턴',
  RUNNING: '육상',
  CYCLE: '사이클',
  TABLETENNIS: '탁구',
} as const;

export type SportsType = (typeof SportsType)[keyof typeof SportsType];
