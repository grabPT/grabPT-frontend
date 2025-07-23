import clsx from 'clsx';

interface StepperProps {
  total: number;
  current: number;
  barWidth?: string;
}

const Stepper = ({ total, current, barWidth = 'w-12' }: StepperProps) => {
  return (
    <div className="flex gap-2">
      {Array.from({ length: total }, (_, idx) => (
        <div
          key={idx}
          className={clsx(
            'h-1 rounded-full',
            barWidth,
            idx < current ? 'bg-[var(--color-button)]' : 'bg-[var(--color-white-dark)]',
          )}
        />
      ))}
    </div>
  );
};

export default Stepper;
