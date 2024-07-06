import { createBrowserRouter } from 'react-router-dom';
import Root from '../Root.jsx';
import ErrorPage from '../pages/error-page/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    index: true,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

export default router;
