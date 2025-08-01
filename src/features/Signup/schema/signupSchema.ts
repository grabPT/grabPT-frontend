import { z } from 'zod';

export const userInfoSchema = z.object({
  email: z.email({ message: '유효하지 않은 이메일 형식입니다.' }),
  phoneNum: z
    .string()
    .transform((val) => val.replace(/-/g, ''))
    .refine((val) => /^01[016789]\d{3,4}\d{4}$/.test(val), {
      message: '유효하지 않은 전화번호 형식입니다.',
    }),
  address: z.string().min(1, { message: '주소를 입력해주세요.' }),
  specAddress: z.string().min(1, { message: '주소를 입력해주세요.' }),
  verifyNum: z.string().min(1, { message: '인증번호를 입력하세요.' }),
});

export const proInfoSchema = z.object({
  center: z.string().min(1, { message: '활동 센터 이름을 입력해주세요.' }),
  age: z.coerce.number().min(1, { message: '나이를 입력해주세요.' }),
  career: z.coerce.number({ message: '경력(년)을 입력해주세요.' }),
  gender: z.coerce.number(),
});

export const nicknameInfoSchema = z.object({
  nickname: z.string().min(1, { message: '닉네임을 입력하세요' }),
  profileImageUrl: z.string(),
});
