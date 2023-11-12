import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import ErrorPage from '../pages/ErrorPage';
import BoardsPage from '../pages/BoardsPage';
import BoardPage from '../pages/BoardPage';
import { JSX } from 'react';

function createRoute(path: string, element: JSX.Element): object {
  return {
    path,
    element,
  };
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      createRoute('/boards', <BoardsPage />),
      createRoute('/board/:id', <BoardPage />),
    ],
  },
]);
