import Badminton from '@/features/Signup/assets/Badminton.png';
import Boxing from '@/features/Signup/assets/Boxing.png';
import Dance from '@/features/Signup/assets/Cycle.png';
import Golf from '@/features/Signup/assets/Golf.png';
import Pilates from '@/features/Signup/assets/Pliates.png';
import Running from '@/features/Signup/assets/Running.png';
import Swimming from '@/features/Signup/assets/Swimming.png';
import Tabletennis from '@/features/Signup/assets/Tabletennis.png';
import Tennis from '@/features/Signup/assets/Tennis.png';
import Health from '@/features/Signup/assets/Weight.png';
import type { CategoryCodeType } from '@/types/RealtimeMatchingType';
import { SportsType } from '@/types/SportsType';

export type SportItem = {
  id: number;
  slug: CategoryCodeType;
  label: string;
  type: SportsType;
  img: string;
};

export const SPORTS: SportItem[] = [
  { id: 1, slug: 'health', label: '헬스', type: SportsType.HEALTH, img: Health },
  { id: 2, slug: 'pilates', label: '필라테스', type: SportsType.PILATES, img: Pilates },
  { id: 3, slug: 'golf', label: '골프', type: SportsType.GOLF, img: Golf },
  { id: 4, slug: 'tennis', label: '테니스', type: SportsType.TENNIS, img: Tennis },
  { id: 5, slug: 'swimming', label: '수영', type: SportsType.SWIMMING, img: Swimming },
  { id: 6, slug: 'boxing', label: '복싱', type: SportsType.BOXING, img: Boxing },
  { id: 7, slug: 'badminton', label: '배드민턴', type: SportsType.BADMINTON, img: Badminton },
  { id: 8, slug: 'running', label: '러닝', type: SportsType.RUNNING, img: Running },
  { id: 9, slug: 'dance', label: '댄스', type: SportsType.DANCE, img: Dance },
  { id: 10, slug: 'tennis', label: '테니스', type: SportsType.TABLETENNIS, img: Tabletennis },
];
