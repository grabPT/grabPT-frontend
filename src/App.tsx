import { useEffect } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import UnreadCountController from '@/features/Chat/controller/UnreadCountController';
import AlarmController from '@/layout/controller/AlarmController';
import { useStompStore } from '@/store/useStompStore';

import { buildRoutes } from './routes/builder';
import { routesManifest } from './routes/manifest';

export default function App() {
  const init = useStompStore((s) => s.init);
  const teardown = useStompStore((s) => s.teardown);

  useEffect(() => {
    init();
    return () => teardown();
  }, [init, teardown]);

  const router = createBrowserRouter(buildRoutes(routesManifest));
  return (
    <>
      <RouterProvider router={router} />
      <UnreadCountController />
      <AlarmController />
    </>
  );
}
