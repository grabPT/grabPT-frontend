import { useState } from 'react';

import { useParams } from 'react-router-dom';

import ErrorComponent from '@/components/ErrorComponent';
import LoadingMuscle from '@/components/LoadingMuscle';
import Pagination from '@/components/Pagination';
import Tabs, { type TabItem } from '@/components/Tabs';
import { urlFor } from '@/constants/routes';
import SuggestListItem from '@/features/SuggestListForRequest/components/SuggestListItem';
import { useGetSuggestListForRequest } from '@/features/SuggestListForRequest/hooks/useGetSuggestListForRequest';

const paramToPositiveInt = (s?: string) => {
  if (!s || !/^\d+$/.test(s)) return undefined;
  const n = parseInt(s, 10);
  return n > 0 ? n : undefined;
};

const SuggestListForRequest = () => {
  const { id } = useParams<{ id?: string }>();
  const [isWriter] = useState<boolean>(true);
  const [page, setPage] = useState(1);

  // URL 파라미터 안전 변환
  const requestionId = paramToPositiveInt(id);

  // 잘못된/누락된 파라미터면 즉시 가드 (훅 호출 X)
  // if (!reqId) retur;

  const { data, error, isPending } = useGetSuggestListForRequest({
    requestionId: requestionId || 1,
    page: page,
  });
  const suggestList = data?.content || [];

  const TabItems: TabItem[] = [
    { label: '정보', to: urlFor.requestDetail(requestionId) },
    { label: '제안 목록', to: urlFor.requestSuggests(requestionId) },
  ];

  if (isPending) return <LoadingMuscle />;
  if (error) return <ErrorComponent />;
  console.log(suggestList);

  return (
    <section className="flex flex-col items-center py-6">
      {isWriter && <Tabs items={TabItems} width="w-[400px]" />}
      {suggestList.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center py-16">
          <div className="space-y-4 text-center">
            <div className="mb-4 text-6xl">📝</div>
            <h2 className="text-2xl font-bold text-gray-800">아직 제안서가 없어요</h2>
            <p className="max-w-md leading-relaxed text-gray-500">
              전문가들이 회원님의 요청서를 검토하고 있습니다.
              <br />곧 멋진 제안서들이 도착할 예정이니 조금만 기다려주세요!
            </p>
            <div className="mt-8 rounded-lg border border-blue-100 bg-blue-50 p-4">
              <p className="text-sm text-blue-700">
                💡 <strong>TIP:</strong> 보통 24시간 이내에 첫 제안서가 도착해요
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-12 py-12">
            {suggestList.map((suggest, idx) => (
              <SuggestListItem key={idx} suggest={suggest} />
            ))}
          </div>
          <Pagination total={data.totalPages} page={page} onChange={(p) => setPage(p)} />
        </>
      )}
    </section>
  );
};

export default SuggestListForRequest;
