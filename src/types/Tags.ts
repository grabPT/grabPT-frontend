import type { TimeSlot } from '@/types/ReqeustsType';

export type Tags = {
  categoryName: string;
  availableTimes: TimeSlot[];
  daysPerWeek: number;
};
