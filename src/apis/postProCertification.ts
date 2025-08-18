import imageCompression from 'browser-image-compression';

import { privateInstance } from '@/libs/axios';

// 파일 압축 함수
async function compressFiles(files: File[]) {
  const compressedFiles: File[] = [];
  for (const file of files) {
    console.log(`📁 원본 파일: ${file.name} (${file.size} bytes)`);

    const compressed = await imageCompression(file, {
      maxSizeMB: 0.5, // ✅ 500KB로 줄임
      maxWidthOrHeight: 800, // ✅ 해상도도 줄임
      useWebWorker: true,
      fileType: 'image/jpeg', // ✅ JPEG로 통일
    });

    console.log(`📁 압축된 파일: ${compressed.name} (${compressed.size} bytes)`);
    console.log(`📁 압축률: ${((1 - compressed.size / file.size) * 100).toFixed(1)}%`);

    compressedFiles.push(compressed);
  }
  return compressedFiles;
}

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

  // ✅ 새로운 DTO 구조로 요청 생성
  const requestPayload = {
    existingCertifications,
    newCertifications,
  };

  // ✅ 새로운 파일들만 압축 후 첨부
  const compressedFiles = await compressFiles(files);
  compressedFiles.forEach((file) => {
    formData.append('newImages', file); // ✅ 스웨거와 동일한 필드명
  });

  // ✅ 디버깅 로그
  console.log('=== POST 요청 상세 로그 ===');
  console.log('📋 Request Payload:', requestPayload);
  console.log('📋 Request JSON:', JSON.stringify(requestPayload, null, 2));
  console.log('📁 Files to upload:', files);
  console.log('📁 Files count:', files.length);

  console.log('--- FormData Preview ---');
  console.log('📄 Request URL parameter:', encodeURIComponent(JSON.stringify(requestPayload)));
  console.log('📄 FormData newImages:', formData.getAll('newImages'));
  console.log('📄 FormData newImages count:', formData.getAll('newImages').length);

  // ✅ boundary는 axios가 자동 세팅
  const response = await privateInstance.post(
    `/mypage/pro/certification?request=${encodeURIComponent(JSON.stringify(requestPayload))}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  console.log('=== POST 요청 응답 ===');
  console.log('📋 Response status:', response.status);
  console.log('📋 Response data:', response.data);

  return response;
};
