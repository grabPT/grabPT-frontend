import { Route, Routes, useNavigate } from 'react-router-dom';

import { urlFor } from '@/constants/routes';
import type { SportItem } from '@/constants/sports';
import SportsSelectSection from '@/features/Category/components/SportsSelectSection';
import { useSelectedSportStore } from '@/store/useSelectedCategoryStore';

import CategoryDetailPage from './CategoryDetailPage';

/**
 * 카테고리 페이지
 */
export default function CategoryPage() {
  const navigate = useNavigate();

  // 전역으로 관리하는 이유가 있나요
  const selected = useSelectedSportStore((s) => s.selected);
  const setSelected = useSelectedSportStore((s) => s.setSelected);

  // 스포츠 선택 핸들러
  const handleSelect = (type: SportItem) => {
    setSelected(type);
    navigate(urlFor.categoryDetail(type.slug)); // /category/tennis 등
  };

  // 이거 왜 이렇게 되어있는 걸까요
  return (
    <Routes>
      <Route index element={<SportsSelectSection selected={selected} onSelect={handleSelect} />} />
      <Route path=":slug" element={<CategoryDetailPage />} />
    </Routes>
  );
}
