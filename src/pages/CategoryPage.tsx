// src/features/Category/pages/CategoryPage.tsx
import { useState } from 'react';

import { Route, Routes, useNavigate, useParams } from 'react-router-dom';

import SportsSelectSection from '@/features/Category/components/SportsSelectSection';
import { SportsType } from '@/types/SportsType';

import CategoryDetailPage from './CategoryDetailPage';

export default function CategoryPage() {
  const [selected, setSelected] = useState<SportsType | null>(null);
  const navigate = useNavigate();

  const handleSelect = (type: SportsType) => {
    setSelected(type);
    navigate(`/category/${type.toLowerCase()}`); // /category/tennis 등
  };

  return (
    <Routes>
      <Route index element={<SportsSelectSection selected={selected} onSelect={handleSelect} />} />
      <Route path=":slug" element={<CategoryDetailPage />} />
    </Routes>
  );
}
