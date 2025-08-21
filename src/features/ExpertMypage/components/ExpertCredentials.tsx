import { useEffect, useMemo, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import imageCompression from 'browser-image-compression';

import type { certificationResponse } from '@/apis/getProCertifications';
import { CirtificationCard, CirtificationEditCard } from '@/components/CirtificationCard';
import {
  MyProfileEditButton,
  MyProfileEditCancelButton,
  MyProfileEditSaveButton,
} from '@/components/myProfileEditButton';
import { useGetProCertifications } from '@/hooks/useGetProCertifications';
import { usePostCertifications } from '@/hooks/usePostCertifications';

const ExpertCredentials = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [certificationList, setCertificationList] = useState<certificationResponse[]>([]);
  const [originalList, setOriginalList] = useState<certificationResponse[]>([]);

  // ✅ 새로운 파일만 관리하는 상태 (새로 추가된 것들만)
  const [newFiles, setNewFiles] = useState<File[]>([]);

  console.log('newFiles:', newFiles);

  const queryClient = useQueryClient();
  const { data } = useGetProCertifications();
  const certifications = useMemo(
    () => data?.result.certifications || [],
    [data?.result.certifications],
  );

  useEffect(() => {
    if (certifications.length > 0) {
      setCertificationList(certifications);
      setOriginalList(certifications);
      setNewFiles([]); // 새로운 파일 배열 초기화
    }
  }, [certifications]);

  console.log('certificationList:', certificationList);

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleCancelClick = () => {
    setCertificationList(originalList);
    setNewFiles([]);
    setIsEditMode(false);
  };

  const handleDeleteCertification = (index: number) => {
    setCertificationList((prev) => {
      const target = prev[index];
      const isNew = !target.imageUrl || target.imageUrl.startsWith('blob:');

      // 삭제되는 게 신규 항목이면 newFiles에서도 같은 "신규 순번"을 제거
      if (isNew) {
        // index 이전까지의 신규 개수를 세어 newFiles에서의 인덱스를 구한다
        const newIndexBefore = prev
          .slice(0, index)
          .filter((c) => !c.imageUrl || c.imageUrl.startsWith('blob:')).length;

        setNewFiles((prevFiles) => prevFiles.filter((_, i) => i !== newIndexBefore));
      }

      return prev.filter((_, i) => i !== index);
    });
  };

  const { mutate } = usePostCertifications();

  const isNewCert = (c: certificationResponse) => !c.imageUrl || c.imageUrl.startsWith('blob:');

  const convertCertificationType = (type: string | number): number => {
    if (typeof type === 'number') return type;
    switch (type) {
      case 'ACADEMIC':
        return 0;
      case 'CERTIFICATE':
        return 1;
      case 'CAREER':
        return 2;
      case 'AWARD':
        return 3;
      default:
        return 0;
    }
  };

  const handleSaveClick = () => {
    // 1) 기존 항목: S3 URL 등 blob 이 아닌 imageUrl
    const existingCertifications = certificationList
      .filter((c) => !isNewCert(c))
      .map((c) => ({
        imageUrl: c.imageUrl!,
        description: c.description,
        certificationType: convertCertificationType(c.certificationType),
      }));

    // 2) 신규 항목: imageUrl 없거나 blob:
    const newCertifications = certificationList.filter(isNewCert).map((c) => ({
      description: c.description,
      certificationType: convertCertificationType(c.certificationType),
    }));

    // 신규 파일은 onAdd 순서대로 newFiles에 누적/삭제 관리했으므로 그대로 사용
    const filesToUpload = newFiles;

    mutate(
      { existingCertifications, newCertifications, files: filesToUpload },
      {
        onSuccess: () => {
          console.log('자격 사항 저장 성공');
          queryClient.invalidateQueries({ queryKey: ['pro-certifications'] });
          setIsEditMode(false);
        },
        onError: (err: any) => {
          console.error('자격 사항 저장 실패:', err);
          console.error('Error details:', err.response?.data);
        },
      },
    );
  };

  return (
    <div className="mx-auto mt-[40px] flex flex-col items-center justify-center">
      <div className="flex w-[600px] items-center justify-between">
        <span className="text-[24px] font-semibold">자격 사항</span>
        {!isEditMode ? (
          <MyProfileEditButton onClick={handleEditClick} />
        ) : (
          <div className="flex gap-[4px]">
            <MyProfileEditCancelButton onClick={handleCancelClick} />
            <MyProfileEditSaveButton onClick={handleSaveClick} />
          </div>
        )}
      </div>
      <hr className="mt-[10px] w-[600px] border-t-2 border-[#B8B8B8]" />
      <div className="mt-[20px] flex min-h-[500px] flex-col items-center justify-center">
        {certificationList.length > 0 ? (
          certificationList.map((certification, index) => (
            <div key={index} className="mb-4">
              <CirtificationCard
                CirtificationCode={certification.certificationType}
                CirtificationDescription={certification.description}
                imageUrl={certification.imageUrl}
                isEditMode={isEditMode}
                onDelete={() => handleDeleteCertification(index)}
              />
            </div>
          ))
        ) : (
          <div className="flex h-[200px] w-[600px] items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
            <p className="text-center text-lg font-medium text-gray-500">
              아직 자격 사항 증명 자료가 등록되지 않았어요! <br />
              {isEditMode
                ? '추가 버튼을 눌러 자격 사항을 등록해보세요 ✍️'
                : '편집 모드에서 자격 사항을 등록할 수 있어요.'}
            </p>
          </div>
        )}
        {isEditMode && (
          <CirtificationEditCard
            onAdd={async (newCert, newFile) => {
              let compressedFile = newFile;
              if (newFile) {
                compressedFile = await imageCompression(newFile, {
                  maxSizeMB: 0.5, // ✅ 500KB로 줄임
                  maxWidthOrHeight: 800, // ✅ 해상도도 줄임
                  fileType: 'image/jpeg', // ✅ JPEG로 통일
                });
              }

              // 새로운 자격증과 파일을 추가
              setCertificationList((prev) => [...prev, newCert]);
              if (compressedFile) {
                setNewFiles((prev) => [...prev, compressedFile]);
              }

              console.log('새 자격증 추가됨:', newCert);
              console.log('새 파일 추가됨:', compressedFile);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ExpertCredentials;
