import { cn } from '@/libs/cn';

interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner = ({ className }: LoadingSpinnerProps) => {
  return (
    <div
      className={cn(
        'text-grabpt inline-block animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]',
        className,
      )}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !border-0 !p-0 !whitespace-nowrap ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default LoadingSpinner;
