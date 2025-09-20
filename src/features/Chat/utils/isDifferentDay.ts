export const isDifferentDay = (prev: Date | null, curr: Date) => {
  if (!prev) return true;
  return (
    prev.getFullYear() !== curr.getFullYear() ||
    prev.getMonth() !== curr.getMonth() ||
    prev.getDate() !== curr.getDate()
  );
};
