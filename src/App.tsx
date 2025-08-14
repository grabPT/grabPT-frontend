import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import AuthGate from '@/components/AuthGate';

import { buildRoutes } from './routes/builder';
import { routesManifest } from './routes/manifest';
import { useMemo } from 'react';

export default function App() {
  const routes = useMemo(() => buildRoutes(routesManifest), []);
  const router = useMemo(() => createBrowserRouter(routes), [routes]);

  return (
    <AuthGate>
      <RouterProvider router={router} />
    </AuthGate>
  );
}
