import { createBrowserRouter } from 'react-router-dom';
import Root from '../Root.jsx';
import ErrorPage from '../pages/error-page/ErrorPage.jsx';
import RegisterPage from '../pages/register/RegisterPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    index: true,
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

export default router;
