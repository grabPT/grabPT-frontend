// 카테고리 상세 페이지에서 불러오는 전문가 목록(위치 기반)
import { END_POINT } from '@/constants/endPoints';
import { publicInstance } from '@/libs/axios';
import type { getCategoryProsInfoDto } from '@/types/CategoryProsType';

export const getCategoryPros = async (categoryCode: string, region: string) => {
  try {
    const { data } = await publicInstance.get<getCategoryProsInfoDto>(
      END_POINT.CATEGORY.proList(categoryCode),
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
