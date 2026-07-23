import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import LookupPage from '@/pages/LookupPage';
import StatisticsPage from '@/pages/StatisticsPage';
import RankingPage from '@/pages/RankingPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/lookup" replace />,
      },
      {
        path: 'lookup',
        element: <LookupPage />,
      },
      {
        path: 'statistics',
        element: <StatisticsPage />,
      },
      {
        path: 'ranking',
        element: <RankingPage />,
      },
      {
        path: '*',
        element: <Navigate to="/lookup" replace />,
      },
    ],
  },
]);
