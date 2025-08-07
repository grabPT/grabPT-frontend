import { z } from 'zod';

import { AGES, DAYS, GENDERS, PURPOSES, TIMES } from '@/types/ReqeustsType';

export const detailInfoSchema = z.object({
  purpose: z.array(z.enum(PURPOSES)).min(1, '목적을 하나 이상 선택해주세요.'),
  etcPurposeContent: z.string().max(100, '기타 목적 입력은 100자 이하로 입력해주세요.').optional(),
  ageGroup: z
    .union([z.enum(AGES), z.literal(null)])
    .refine((val) => val !== null, { message: '연령대를 선택해주세요.' }),
  userGender: z
    .union([z.enum(GENDERS), z.literal('')])
    .refine((val) => val !== '', { message: '회원님의 성별을 선택해주세요.' }),
  trainerGender: z
    .union([z.enum(GENDERS), z.literal('')])
    .refine((val) => val !== '', { message: '희망 트레이너 성별을 선택해주세요.' }),
  startPreference: z.string().nonempty('시작 희망일을 입력해주세요.'),
  availableDays: z.array(z.enum(DAYS)).min(1, '가능한 요일을 하나 이상 선택해주세요.'),
  availableTimes: z.array(z.enum(TIMES)).min(1, '가능한 시간대를 하나 이상 선택해주세요.'),
  content: z.string().max(500, '요청사항은 300자 이내로 입력해주세요.'),
});

export const patchRequestSchema = detailInfoSchema.extend({
  price: z.number().min(0, { message: '가격과 횟수는 0 이상이여야 합니다.' }),
  sessionCount: z.number().min(0, { message: '가격과 횟수는 0 이상이여야 합니다.' }),
});
