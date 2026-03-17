import type { getContractInfoResultType } from '@/features/Contract/types/getContractInfoType';
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

type ContractDates = {
  startDate?: string;
  contractDate?: string;
};

export const toUserDefaults = (
  info?: getContractInfoResultType['userInfo'],
): userInfoType | undefined => {
  if (!info) return undefined;

  return {
    name: info.name ?? '',
    birth: info.birth ?? null,
    phoneNumber: info.phoneNumber ?? '',
    gender: info.gender ?? null,
    location: info.location ?? '',
  };
};

export const toProDefaults = (
  info?: getContractInfoResultType['proInfo'],
): userInfoType | undefined => {
  if (!info) return undefined;

  return {
    name: info.name ?? '',
    birth: info.birth ?? null,
    phoneNumber: info.phoneNumber ?? '',
    gender: info.gender ?? null,
    location: info.location ?? '',
  };
};

export const getInitialSignUrl = (signImageUrl?: string | null) => signImageUrl || null;

export const isFilledUser = (defs?: userInfoType, sign?: string | null) =>
  !!defs &&
  !!defs.name &&
  !!defs.birth &&
  !!defs.phoneNumber &&
  !!defs.gender &&
  !!defs.location &&
  !!sign;

export const isFilledPro = (defs?: userInfoType, sign?: string | null, dates?: ContractDates) =>
  !!defs &&
  !!defs.name &&
  !!defs.birth &&
  !!defs.phoneNumber &&
  !!defs.gender &&
  !!defs.location &&
  !!dates?.startDate &&
  !!dates?.contractDate &&
  !!sign;
