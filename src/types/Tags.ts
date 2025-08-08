import type { TimeSlot } from '@/types/ReqeustsType';

export type Tags = {
  cagtegoryName: string;
  availableTimes: TimeSlot[];
  daysPerWeek: number;
};
