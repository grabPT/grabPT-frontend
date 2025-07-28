import { useParams } from 'react-router-dom';

const RequestDetailPage = () => {
  const { id } = useParams();
  console.log(id);
  return <div>요청서상세</div>;
};

export default RequestDetailPage;
