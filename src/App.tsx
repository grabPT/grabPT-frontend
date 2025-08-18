import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import UnreadCountController from '@/features/Chat/controller/UnreadCountController';
import AlarmController from '@/layout/controller/AlarmController';

import { buildRoutes } from './routes/builder';
import { routesManifest } from './routes/manifest';

export default function App() {
  const router = createBrowserRouter(buildRoutes(routesManifest));
  return (
    <>
      <AlarmController />
      <UnreadCountController />
      <RouterProvider router={router} />
    </>
  );
}
