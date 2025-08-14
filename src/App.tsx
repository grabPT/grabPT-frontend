// App.tsx
import { useEffect } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { useRoleStore } from '@/store/useRoleStore';

import { buildRoutes } from './routes/builder';
import { routesManifest } from './routes/manifest';

export default function App() {
  useEffect(() => {
    const state = useRoleStore.getState();
    console.log('Role Store State:', state);

    state.bootstrap();

    const builtRoutes = buildRoutes(routesManifest);
    console.log('Built Routes:', builtRoutes);
  }, []);
  const router = createBrowserRouter(buildRoutes(routesManifest));
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
