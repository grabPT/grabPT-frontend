// src/features/Category/pages/CategoryPage.tsx
import { useState } from 'react';

import { Route, Routes, useNavigate } from 'react-router-dom';

import SportsSelectSection from '@/features/Category/components/SportsSelectSection';
import type { SportItem } from '@/constants/sports';

import CategoryDetailPage from './CategoryDetailPage';

export default function CategoryPage() {
  const [selected, setSelected] = useState<SportItem | null>(null);
  const navigate = useNavigate();

  const handleSelect = (type: SportItem) => {
    setSelected(type);
    navigate(`/category/${type.label}`); // /category/tennis 등
  };

  return (
    <Routes>
      <Route index element={<SportsSelectSection selected={selected} onSelect={handleSelect} />} />
      <Route path=":slug" element={<CategoryDetailPage />} />
    </Routes>
  );
}
