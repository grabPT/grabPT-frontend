import type { ZodError } from 'zod';

export const toFieldErrorMap = (e: ZodError): Record<string, string> => {
  // 타입 명시: string[] | undefined
  const fieldErrors = e.flatten().fieldErrors as Record<string, string[] | undefined>;
  const out: Record<string, string> = {};

  for (const [k, arr] of Object.entries(fieldErrors)) {
    if (Array.isArray(arr) && arr.length > 0 && arr[0]) {
      out[k] = arr[0]; // 첫 메시지만 사용
    }
  }
  return out;
};
