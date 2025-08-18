export function dataURLtoFile(dataUrl: string, filename: string): File {
  const [header, body] = dataUrl.split(',');
  const mime = header.match(/:(.*?);/)?.[1] ?? 'image/png';
  const binary = atob(body);
  const len = binary.length;
  const u8arr = new Uint8Array(len);
  for (let i = 0; i < len; i++) u8arr[i] = binary.charCodeAt(i);
  return new File([u8arr], filename, { type: mime });
}
