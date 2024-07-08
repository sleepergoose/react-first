import { createBrowserRouter } from 'react-router-dom';
import Root from '../Root.jsx';
import ErrorPage from '../pages/error-page/ErrorPage.jsx';
import RegisterPage from '../pages/register/RegisterPage.jsx';
import LoginPage from '../pages/login/LoginPage.jsx';
import HomePage from '../pages/home/HomePage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

export default router;
