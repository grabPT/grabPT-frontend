export const BREAKPOINT_MEDIA_QUERIES = [
  window.matchMedia('(max-width: 767px)'),
  window.matchMedia('(max-width: 1023px)'),
  window.matchMedia('(max-width: 1819px)'),
];

export const getSlidesToShow = (): number => {
  if (typeof window === 'undefined') return 1;

  if (window.matchMedia('(max-width: 767px)').matches) return 1;
  if (window.matchMedia('(max-width: 1023px)').matches) return 2;
  if (window.matchMedia('(max-width: 1819px)').matches) return 3;
  return 4;
};
