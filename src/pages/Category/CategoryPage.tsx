// src/features/Category/pages/CategoryPage.tsx
//import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { urlFor } from '@/constants/routes';
import type { SportItem } from '@/constants/sports';
import SportsSelectSection from '@/features/Category/components/SportsSelectSection';
import { useSelectedSportStore } from '@/store/useSelectedCategoryStore';

import CategoryDetailPage from './CategoryDetailPage';

export default function CategoryPage() {
  //const [selected, setSelected] = useState<SportItem | null>(null);
  const navigate = useNavigate();

  const selected = useSelectedSportStore((s) => s.selected);
  const setSelected = useSelectedSportStore((s) => s.setSelected);

  const handleSelect = (type: SportItem) => {
    setSelected(type);
    navigate(urlFor.categoryDetail(type.slug)); // /category/tennis 등
  };

  return (
    <Routes>
      <Route index element={<SportsSelectSection selected={selected} onSelect={handleSelect} />} />
      <Route path=":slug" element={<CategoryDetailPage />} />
    </Routes>
  );
}
