import type { PropsWithChildren } from 'react';

import clsx from 'clsx';

export type borderColor = 'red' | 'blue';
// export type borderColor = '#FF1010' | '#003EFB';

interface InformationCardProps {
  title: string;
  borderColor: borderColor;
}

// 계약서에 포함된 카드ui 컴포넌트
// @param
const InformationCard = ({
  title,
  borderColor,
  children,
}: PropsWithChildren<InformationCardProps>) => {
  return (
    <div
      className={clsx(
        'flex flex-col rounded-lg border-l-2 bg-[#EFEFEF] px-3 py-2',
        borderColor === 'red' ? 'border-[#FF1010]' : 'border-button',
      )}
    >
      <h1 className="text-sm font-bold">{title}</h1>
      <hr className="mt-3 border-[#929292]" />

      <div className="p-2">{children}</div>
    </div>
  );
};

export default InformationCard;
