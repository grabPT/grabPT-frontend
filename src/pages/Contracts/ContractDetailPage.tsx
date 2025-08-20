import { useParams } from 'react-router-dom';

import ErrorComponent from '@/components/ErrorComponent';
import LoadingMuscle from '@/components/LoadingMuscle';
import { useGetContractPdf } from '@/features/Contract/hooks/useGetContractPdf';

const ContractDetailPage = () => {
  const id = useParams();
  const contractId = Number(id);
  const { data: pdfUrl, isError, isPending } = useGetContractPdf({ contractId });
  if (isPending) return <LoadingMuscle />;
  if (isError) return <ErrorComponent />;
  return (
    <main>
      <iframe src={pdfUrl} width="100%" height="100%" title="PDF Viewer" />
    </main>
  );
};

export default ContractDetailPage;
