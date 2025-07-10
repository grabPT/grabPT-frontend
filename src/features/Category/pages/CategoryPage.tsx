// src/features/Category/pages/CategoryPage.tsx
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

import { SportsType } from '@/features/Signup/types/SportsType';
import { SportsSelectSection } from '../components/SportsSelectSection';
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
      <Route
        index
        element={<SportsSelectSection selected={selected} onSelect={handleSelect} />}
      />
      <Route path=":slug" element={<CategoryDetailPage />} />
    </Routes>
  );
}
