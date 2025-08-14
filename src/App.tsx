// App.tsx
import { useEffect } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { useRoleStore } from '@/store/useRoleStore';

import { buildRoutes } from './routes/builder';
import { routesManifest } from './routes/manifest';

export default function App() {
  useEffect(() => {
    useRoleStore.getState().bootstrap();
  }, []);
  const router = createBrowserRouter(buildRoutes(routesManifest));
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
