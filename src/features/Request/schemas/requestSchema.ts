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
  proGender: z
    .union([z.enum(GENDERS), z.literal('')])
    .refine((val) => val !== '', { message: '희망 트레이너 성별을 선택해주세요.' }),
  startDate: z
    .string()
    .min(1, '시작일을 입력해주세요')
    .refine(
      (value) => {
        const start = new Date(value);
        if (isNaN(start.getTime())) return false;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        start.setHours(0, 0, 0, 0);

        return start >= today;
      },
      {
        message: '이미 지난 날짜로는 시작할 수 없어요.',
      },
    ),
  availableDays: z.array(z.enum(DAYS)).min(1, '가능한 요일을 하나 이상 선택해주세요.'),
  availableTimes: z.array(z.enum(TIMES)).min(1, '가능한 시간대를 하나 이상 선택해주세요.'),
  content: z.string().max(500, '요청사항은 300자 이내로 입력해주세요.'),
});

export const patchRequestSchema = detailInfoSchema.extend({
  price: z
    .number({ message: '횟수와 가격을 입력해주세요.' })
    .refine((val) => !isNaN(val) && val >= 1, {
      message: '횟수와 가격은 1 이상이어야 합니다.',
    }),
  sessionCount: z
    .number({ message: '횟수와 가격을 입력해주세요.' })
    .refine((val) => !isNaN(val) && val >= 1, {
      message: '횟수와 가격은 1 이상이어야 합니다.',
    }),
  categoryId: z.number().min(1, { message: '운동 카테고리를 받아오는데 실패했습니다.' }),
});
