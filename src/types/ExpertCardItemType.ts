export interface ExpertCardProps {
  imageUrl: string;
  name: string;
  center: string;
  rating: number;
  pricePerSession: number;
}

// ExpertCardScroll에서 사용할 리스트 아이템(상세 이동용 id 포함)
export type ExpertCardItem = ExpertCardProps & { id: number };
