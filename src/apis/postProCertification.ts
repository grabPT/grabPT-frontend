import { multipartInstance } from '@/libs/axios';
import { compressImage } from '@/utils/imageCompression';

export const postProCertifications = async (
  existingCertifications: Array<{
    imageUrl?: string;
    description: string;
    certificationType: number;
  }>,
  newCertifications: Array<{
    description: string;
    certificationType: number;
  }>,
  files: File[],
) => {
  const formData = new FormData();

  const requestPayload = {
    existingCertifications,
    newCertifications,
  };

  const compressedFiles = await Promise.all(
    files.map((file) => compressImage(file, { maxSizeMB: 0.5 })),
  );
  compressedFiles.forEach((file) => {
    formData.append('newImages', file); // ✅ 스웨거와 동일한 필드명
  });

  const response = await multipartInstance.post(
    `/mypage/pro/certification?request=${encodeURIComponent(JSON.stringify(requestPayload))}`,
    formData,
  );

  return response;
};
