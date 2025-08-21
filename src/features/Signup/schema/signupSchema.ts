import { z } from 'zod';

export const userInfoSchema = z.object({
  email: z.email({ message: '유효하지 않은 이메일 형식입니다.' }),
  phoneNum: z
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
});
