import { useMutation } from '@tanstack/react-query';

import { postProCertifications } from '@/apis/postProCertification';

export const usePostCertifications = () => {
  return useMutation({
    mutationFn: ({
      existingCertifications,
      newCertifications,
      files,
    }: {
      existingCertifications: Array<{
        imageUrl?: string;
        description: string;
        certificationType: number;
      }>;
      newCertifications: Array<{
        description: string;
        certificationType: number;
      }>;
      files: File[];
    }) => postProCertifications(existingCertifications, newCertifications, files),
  });
};
