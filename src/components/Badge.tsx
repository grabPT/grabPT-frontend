import { MATCH_STATUS_UI, type MatchStatusType } from '@/types/RealtimeMatchingType';

interface BadgeProps {
  status: MatchStatusType;
}

const Badge = ({ status }: BadgeProps) => {
  const { color, placeholder } = MATCH_STATUS_UI[status];

  return (
    <div className="mt-8 flex justify-center">
      <span className={`rounded-full px-4 py-2 text-white ${color}`}>{placeholder}</span>
    </div>
  );
};

export default Badge;
