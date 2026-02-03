import { useEffect } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import LoadingMuscle from '@/components/LoadingMuscle';
import AlarmController from '@/features/Alarm/controller/AlarmController';
import UnreadCountController from '@/features/Chat/controller/UnreadCountController';
import { useGlobalLoadingStore } from '@/store/useGlobalLoadingStore';
import { useStompStore } from '@/store/useStompStore';

import { buildRoutes } from './routes/builder';
import { routesManifest } from './routes/manifest';

export default function App() {
  const init = useStompStore((s) => s.init);
  const teardown = useStompStore((s) => s.teardown);
  const isLoading = useGlobalLoadingStore((s) => s.isLoading);

  useEffect(() => {
    init();
    return () => teardown();
  }, [init, teardown]);

  const router = createBrowserRouter(buildRoutes(routesManifest));
  return (
    <>
      <RouterProvider router={router} />
      {isLoading && <LoadingMuscle />}
      <UnreadCountController />
      <AlarmController />
    </>
  );
}
