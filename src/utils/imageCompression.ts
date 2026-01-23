import imageCompression from 'browser-image-compression';

type CompressionOptions = {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  fileType?: string;
};

/**
 * 이미지를 압축합니다.
 * 압축된 파일이 원본보다 크거나 압축에 실패하면 원본을 반환합니다.
 * 기본적으로 JPEG로 변환하여 호환성을 확보합니다.
 */
export const compressImage = async (file: File, options?: CompressionOptions): Promise<File> => {
  // 이미지가 아닌 경우 원본 반환
  if (!file.type.startsWith('image/')) {
    return file;
  }

  // 이미 작은 파일(예: 100KB 이하)은 압축 스킵 (선택 사항, 필요 시 주석 해제)
  // if (file.size < 100 * 1024) return file;

  const defaultOptions = {
    maxSizeMB: 1, // 기본 1MB
    maxWidthOrHeight: 1920, // FHD 기준
    useWebWorker: true,
    fileType: 'image/jpeg', // 기본 JPEG 변환
    ...options,
  };

  try {
    console.log(`🖼️ 압축 시작: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);

    const compressedFile = await imageCompression(file, defaultOptions);

    console.log(
      `🖼️ 압축 완료: ${compressedFile.name} (${(compressedFile.size / 1024).toFixed(2)} KB)`,
    );

    // 최적화: 압축된 파일이 원본보다 크면 원본 반환 (WebP, 이미 최적화된 이미지 등)
    if (compressedFile.size >= file.size) {
      console.warn('⚠️ 압축된 파일이 원본보다 큽니다. 원본을 사용합니다.');
      return file;
    }

    return compressedFile;
  } catch (error) {
    console.error('❌ 이미지 압축 실패. 원본을 사용합니다.', error);
    return file;
  }
};
