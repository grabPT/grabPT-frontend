import Badminton from '@/features/Signup/assets/Badminton.png';
import Boxing from '@/features/Signup/assets/Boxing.png';
import Cycle from '@/features/Signup/assets/Cycle.png';
import Golf from '@/features/Signup/assets/Golf.png';
import Pilates from '@/features/Signup/assets/Pliates.png';
import Running from '@/features/Signup/assets/Running.png';
import Swimming from '@/features/Signup/assets/Swimming.png';
import Tabletennis from '@/features/Signup/assets/Tabletennis.png';
import Tennis from '@/features/Signup/assets/Tennis.png';
import Weight from '@/features/Signup/assets/Weight.png';
import { SportsType } from '@/types/SportsType';

export type SportItem = {
  slug: string;
  label: string;
  type: SportsType;
  img: string;
};

export const SPORTS: SportItem[] = [
  { slug: 'weight', label: '웨이트', type: SportsType.WEIGHT, img: Weight },
  { slug: 'pilates', label: '필라테스', type: SportsType.PILATES, img: Pilates },
  { slug: 'golf', label: '골프', type: SportsType.GOLF, img: Golf },
  { slug: 'tennis', label: '테니스', type: SportsType.TENNIS, img: Tennis },
  { slug: 'swimming', label: '수영', type: SportsType.SWIMMING, img: Swimming },
  { slug: 'boxing', label: '복싱', type: SportsType.BOXING, img: Boxing },
  { slug: 'badminton', label: '배드민턴', type: SportsType.BADMINTON, img: Badminton },
  { slug: 'running', label: '러닝', type: SportsType.RUNNING, img: Running },
  { slug: 'cycle', label: '사이클', type: SportsType.CYCLE, img: Cycle },
  { slug: 'tabletennis', label: '탁구', type: SportsType.TABLETENNIS, img: Tabletennis },
];
