import type { MouseEvent } from 'react';

interface PaginationProps {
  total: number;
  page: number;
  onChange: (page: number) => void;
}

const Pagination = ({ total, page, onChange }: PaginationProps) => {
  // 유효성 보호
  if (total < 1) return null;

  // 버튼 공통 스타일
  const base = 'flex h-[28px] w-[28px] items-center justify-center rounded font-semibold';

  const pages = Array.from({ length: total }, (_, i) => i + 1);

  /** 좌우 화살표 핸들러 */
  const handleStep = (dir: number) => () => {
    const next = page + dir;
    if (next >= 1 && next <= total) onChange(next);
  };

  /** 숫자 버튼 핸들러 */
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => onChange(Number(e.currentTarget.value));

  return (
    <nav aria-label="페이지네이션">
      <ul className="flex items-center gap-2">
        {/* 이전버튼 */}
        <li>
          <button
            onClick={handleStep(-1)}
            disabled={page === 1}
            className={`${base} text-xl ${page === 1 ? 'text-gray-400' : ''}`}
            aria-label="이전 페이지"
          >
            &lt;
          </button>
        </li>

        {/* 페이지 숫자 */}
        {pages.map((p) => (
          <li key={p}>
            <button
              value={p}
              onClick={handleClick}
              className={
                p === page
                  ? `${base} bg-gray-200 text-black`
                  : `${base} text-gray-700 hover:bg-gray-100`
              }
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          </li>
        ))}

        {/* 다음버튼 */}
        <li>
          <button
            onClick={handleStep(1)}
            disabled={page === total}
            className={`${base} text-xl ${page === total ? 'text-gray-400' : ''}`}
            aria-label="다음 페이지"
          >
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
