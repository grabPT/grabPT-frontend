import { SPORTS } from '@/constants/sports';
import type { SportsSlugType } from '@/types/SportsType';

//slug 랜덤 선택 유틸 함수
export const getRandomSportSlug = (): SportsSlugType => {
  const randomIndex = Math.floor(Math.random() * SPORTS.length);
  return SPORTS[randomIndex].slug;
};
