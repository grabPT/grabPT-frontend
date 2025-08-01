import { useState } from 'react';

import clsx from 'clsx';

import SignatureModal from './SignatureModal';

interface SignatureBoxProps {
  title: string;
  value: string | null;
  onChange: (url: string) => void;
}

const SignatureBox = ({ title, value, onChange }: SignatureBoxProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className={clsx(
          'flex h-[160px] w-[260px] cursor-pointer flex-col items-center justify-center rounded-lg bg-white',
          !value && 'border-2 border-dashed border-gray-400',
        )}
      >
        <p className="mb-2 text-sm font-semibold">{title}</p>
        {value ? (
          <img src={value} alt={`${title} 서명`} className="max-h-[100px] object-contain" />
        ) : (
          <span className="text-xs text-gray-400">클릭하여 서명</span>
        )}
      </div>

      <SignatureModal open={open} onClose={() => setOpen(false)} onSave={(url) => onChange(url)} />
    </>
  );
};

export default SignatureBox;
