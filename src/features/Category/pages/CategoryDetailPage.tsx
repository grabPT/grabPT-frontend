// src/features/Category/pages/CategoryDetailPage.tsx
import { useParams } from 'react-router-dom';

export default function CategoryDetailPage() {
  const { slug } = useParams(); // tennis, golf 등

  return (
    <div>
      <h1>{slug} 카테고리 상세 페이지</h1>
      {/* 여기에 슬러그별 상세 UI 구현 */}
    </div>
  );
}
