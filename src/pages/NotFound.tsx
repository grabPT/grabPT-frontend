import image from '@/assets/images/404.svg';

const NotFound = () => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
    <img src={image} aria-label="404" className="mb-4 h-96 w-96" />
    <h1 className="text-2xl font-semibold">페이지를 찾을 수 없습니다</h1>
    <p className="text-gray-500">주소를 다시 확인해 주세요.</p>
    <a href="/" className="mt-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
      홈으로 돌아가기
    </a>
  </div>
);
export default NotFound;
