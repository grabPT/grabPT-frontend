import { z } from 'zod';

// Zod 스키마 정의
export const contractUserInfoSchema = z.object({
  name: z.string().min(2, '이름을 입력해주세요'),

  phoneNumber: z
    .string()
    .min(1, { message: '전화번호를 입력해주세요.' })
    .transform((val) => val.replace(/[-\s]/g, '')) // 하이픈과 공백 제거
    .refine(
      (val) => {
        // 010으로 시작하는 11자리 번호만 허용
        return val.length === 11 && /^010\d{8}$/.test(val);
      },
      {
        message: '유효하지 않은 전화번호 형식입니다. (010-XXXX-XXXX)',
      },
    ),
  location: z.string().min(1, '주소를 입력해주세요'),
  // ✅ enum: readonly 튜플 + 에러 메시지
  gender: z.enum(['MALE', 'FEMALE'] as const, { error: '성별을 선택해주세요' }),
  // 또는: gender: z.enum(['MALE', 'FEMALE'] as const, '성별을 선택해주세요'),
});

export const contractProInfoSchema = contractUserInfoSchema
  .extend({
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
    expireDate: z.string().min(1, '계약 종료일을 입력해주세요'),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.expireDate) return true; // 개별 필드 검증에서 처리
      return new Date(data.expireDate) > new Date(data.startDate);
    },
    {
      message: '계약 종료일은 시작일보다 뒤여야 합니다',
      path: ['expireDate'],
    },
  );
