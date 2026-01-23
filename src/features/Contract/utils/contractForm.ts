import { extractBaseFromForm } from '@/utils/form';

import type { proInfoType, userInfoType } from '../types/postContractType';

export function extractUserBodyFromForm(form: HTMLFormElement | null): userInfoType | null {
  const baseInfo = extractBaseFromForm(form);
  if (!baseInfo) return null;
  return baseInfo;
}

export function extractProBodyFromForm(form: HTMLFormElement | null): proInfoType | null {
  if (!form) return null;

  const base = extractBaseFromForm(form);
  if (!base) return null;

  const fd = new FormData(form);
  const startDate = String(fd.get('startDate') ?? '').trim();
  const expireDate = String(fd.get('expireDate') ?? '').trim();

  return {
    ...base,
    startDate,
    expireDate,
  };
}
