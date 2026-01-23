import { z } from 'zod';

// Zod 스키마 정의
export const contractUserInfoSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  birth: z.string().min(1, '생년월일을 입력해주세요'),
  phoneNumber: z.string().min(1, '전화번호를 입력해주세요'),
  location: z.string().min(1, '주소를 입력해주세요'),
  // ✅ enum: readonly 튜플 + 에러 메시지
  gender: z.enum(['MALE', 'FEMALE'] as const, { error: '성별을 선택해주세요' }),
  // 또는: gender: z.enum(['MALE', 'FEMALE'] as const, '성별을 선택해주세요'),
});

export const contractProInfoSchema = contractUserInfoSchema
  .extend({
    startDate: z.string().min(1, '시작일을 입력해주세요'),
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
