// 카테고리 상세 페이지에서 불러오는 전문가 목록(위치 기반)
import { publicInstance } from '@/libs/axios';
import type { getCategoryExpertsInfoDto } from '@/types/CategoryExpertsType';

export const getCategoryExperts = async (categoryCode: string, region: string) => {
  try {
    const { data } = await publicInstance.get<getCategoryExpertsInfoDto>(
      `/api/v1/category/${encodeURIComponent(categoryCode)}/trainers`,
      {
        params: { region },
      },
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('GET /api/v1/category/{code}/trainers 실패');
  }
};
