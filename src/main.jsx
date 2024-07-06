import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './Root.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '*',
    element: <Root />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  </React.StrictMode>
);
