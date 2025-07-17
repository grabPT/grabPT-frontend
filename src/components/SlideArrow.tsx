import type { ButtonHTMLAttributes } from 'react';

import clsx from 'clsx';

import RightArrow from '@/assets/images/RightArrow.svg';

interface SlideArrowProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLeft?: boolean;
  width?: string;
  height?: string;
  disabled?: boolean;
}

// 모든 슬라이드에서 공통으로 사용할 수 있게 만들었습니다
// absolute를 사용해서 슬라이드div에 relative 해주셔야 합니다
// width, height은 버튼크기입니다
// disabled에 boolean조건 넣어주시면 되고 onClick 그대로 넘겨주시면 됩니다
const SlideArrow = ({
  isLeft = false,
  width = 'w-12',
  height = 'h-12',
  disabled = false,
  className,
  ...rest
}: SlideArrowProps) => {
  const label = isLeft ? '이전' : '다음';

  return (
    <div
      className={clsx(
        'absolute top-0 flex h-full w-20 items-center justify-center transition-opacity',
        isLeft ? 'left-0' : 'right-0',
        disabled
          ? 'pointer-events-none opacity-0'
          : 'pointer-events-auto opacity-0 hover:opacity-100',
      )}
    >
      <button
        {...rest}
        disabled={disabled}
        title={label}
        aria-label={label}
        className={clsx(
          'relative rounded-full bg-white shadow transition-transform',
          width,
          height,
          className,
        )}
      >
        <img
          src={RightArrow}
          alt={label}
          className={clsx(
            'absolute top-1/2 h-[50%] -translate-y-1/2',
            // 가운데 비주얼이 어색해 살짝 안쪽으로 옮겼습니당
            isLeft ? 'left-[47%] -translate-x-1/2 rotate-180' : 'right-[47%] translate-x-1/2',
          )}
        />
      </button>
    </div>
  );
};

export default SlideArrow;
