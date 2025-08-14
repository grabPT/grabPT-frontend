import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { buildRoutes } from './routes/builder';
import { routesManifest } from './routes/manifest';

export default function App() {
  const router = createBrowserRouter(buildRoutes(routesManifest));
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
