import { useParams } from 'react-router-dom';

import ErrorComponent from '@/components/ErrorComponent';
import LoadingMuscle from '@/components/LoadingMuscle';
import { useGetContractPdf } from '@/features/Contract/hooks/useGetContractPdf';

const ContractDetailPage = () => {
  const { id } = useParams();
  const contractId = Number(id);
  const { data: pdfUrl, isError, isPending } = useGetContractPdf({ contractId });
  if (isPending) return <LoadingMuscle />;
  if (isError) return <ErrorComponent />;
  return (
    <>
      <iframe src={pdfUrl} title="PDF Viewer" className="h-102 w-full" />
    </>
  );
};

export default ContractDetailPage;
