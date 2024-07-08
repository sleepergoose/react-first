import { createBrowserRouter } from 'react-router-dom';
import Root from '../Root.jsx';
import ErrorPage from '../pages/error-page/ErrorPage.jsx';
import RegisterPage from '../pages/register/RegisterPage.jsx';
import LoginPage from '../pages/login/LoginPage.jsx';
import HomePage from '../pages/home/HomePage.jsx';
import AuthGuard from '../guards/auth.guard.jsx';
import UnAuthGuard from '../guards/un-auth.guard.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <AuthGuard component={<HomePage />} />,
      },
    ],
  },
  {
    path: '/register',
    element: <UnAuthGuard component={<RegisterPage />} />,
  },
  {
    path: '/login',
    element: <UnAuthGuard component={<LoginPage />} />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

export default router;
