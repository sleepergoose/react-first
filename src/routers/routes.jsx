import { createBrowserRouter } from 'react-router-dom';
import Root from '../Root.jsx';
import ErrorPage from '../pages/error-page/ErrorPage.jsx';
import RegisterPage from '../pages/register/RegisterPage.jsx';
import LoginPage from '../pages/login/LoginPage.jsx';
import HomePage from '../pages/home/HomePage.jsx';
import AuthGuard from '../guards/auth.guard.jsx';
import UnAuthGuard from '../guards/un-auth.guard.jsx';
import AddProductPage from '../pages/products/add-page/AddProductPage.jsx';
import ProductListPage from '../pages/products/list-page/ProductListPage.jsx';
import RoleBasedGuard from '../guards/role-based.guard.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthGuard component={<Root />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/products',
        element: <ProductListPage />,
      },
      {
        path: '/products/add',
        element: (
          <RoleBasedGuard
            requiredRole={'admin'}
            component={<AddProductPage />}
          />
        ),
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
