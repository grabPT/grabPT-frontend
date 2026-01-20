import z from 'zod';

//이거 잘못 들어간 거 같은데 그냥 지울까요
export const reviewSchema = z.object({
  price: z.number().min(0, { message: '가격과 횟수는 0 이상이여야 합니다.' }),
  sessionCount: z.number().min(0, { message: '가격과 횟수는 0 이상이여야 합니다.' }),

  message: z.string().max(700, { message: '메시지는 700자 이하여야 합니다.' }),
  location: z.string().max(300, { message: '상세 주소는 300자 이하여야 합니다.' }),
});
