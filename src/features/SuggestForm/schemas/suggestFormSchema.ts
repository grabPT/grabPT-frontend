import { z } from 'zod';

export const suggestFormSchema = z.object({
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
  message: z
    .string()
    .min(20, { message: '최소 20자 이상 입력해주세요.' })
    .max(700, { message: '최대 700자까지 입력 가능합니다.' }),
  location: z
    .string()
    .min(5, { message: '최소 5자 이상 입력해주세요.' })
    .max(300, { message: '최대 300자까지 입력 가능합니다.' }),
});
