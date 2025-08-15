// src/features/Mypage/hooks/useEditProDescription.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  type ProCenterPayload,
  type ProDescriptionPayload,
  type ProPricePayload,
  editProCenter,
  editProDescription,
  editProPhotos,
  editProPrice,
} from '@/apis/EditProProfile';

export const USE_PRO_PROFILE_KEY = ['pro-profile']; // 실제 키와 맞춰서 사용하세요
export const USE_MY_PROFILE_KEY = ['myProfile']; // 선택

export function useEditProDescription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProDescriptionPayload) => editProDescription(payload),
    onSuccess: () => {
      // 저장 성공 시 관련 캐시 무효화 (프로필 재조회)
      queryClient.invalidateQueries({ queryKey: USE_PRO_PROFILE_KEY });
      queryClient.invalidateQueries({ queryKey: USE_MY_PROFILE_KEY });
    },
  });
}

export const useEditPhotos = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ files, urls }: { files: File[]; urls: string[] }) => editProPhotos(files, urls),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USE_PRO_PROFILE_KEY });
      queryClient.invalidateQueries({ queryKey: USE_MY_PROFILE_KEY });
    },
  });
};

export const useEditProPrice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ProPricePayload) => editProPrice(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USE_PRO_PROFILE_KEY });
      queryClient.invalidateQueries({ queryKey: USE_MY_PROFILE_KEY });
    },
  });
};

export const useEditProCenter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ProCenterPayload) => editProCenter(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USE_PRO_PROFILE_KEY });
      queryClient.invalidateQueries({ queryKey: USE_MY_PROFILE_KEY });
    },
  });
};
