import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import ErrorPage from '../pages/ErrorPage';
import BoardsPage from '../pages/BoardsPage';
import BoardPage from '../pages/BoardPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/boards',
        element: <BoardsPage />,
      },
      {
        path: '/board/:id',
        element: <BoardPage />,
      },
    ],
  },
]);
