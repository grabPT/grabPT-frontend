import Badminton from '@/features/Signup/assets/Badminton.png';
import Boxing from '@/features/Signup/assets/Boxing.png';
import Dance from '@/features/Signup/assets/Dance.png';
import Golf from '@/features/Signup/assets/Golf.png';
import Pilates from '@/features/Signup/assets/Pliates.png';
import Running from '@/features/Signup/assets/Running.png';
import Swimming from '@/features/Signup/assets/Swimming.png';
import Tabletennis from '@/features/Signup/assets/Tabletennis.png';
import Tennis from '@/features/Signup/assets/Tennis.png';
import Health from '@/features/Signup/assets/Weight.png';
import type { SportsLabelType, SportsSlugType } from '@/types/SportsType';

export type SportItem = {
  id: number;
  slug: SportsSlugType;
  label: SportsLabelType;
  img: string;
};

export const SPORTS: SportItem[] = [
  { id: 1, slug: 'health', label: '헬스', img: Health },
  { id: 2, slug: 'pilates', label: '필라테스', img: Pilates },
  { id: 3, slug: 'golf', label: '골프', img: Golf },
  { id: 4, slug: 'tennis', label: '테니스', img: Tennis },
  { id: 5, slug: 'swimming', label: '수영', img: Swimming },
  { id: 6, slug: 'boxing', label: '복싱', img: Boxing },
  { id: 7, slug: 'badminton', label: '배드민턴', img: Badminton },
  { id: 8, slug: 'running', label: '런닝', img: Running },
  { id: 9, slug: 'dance', label: '댄스', img: Dance },
  { id: 10, slug: 'pingpong', label: '탁구', img: Tabletennis },
];

export function getLabelFromSlug(slug: string): SportsLabelType | undefined {
  return SPORTS.find((s) => s.slug === slug)?.label;
}
