import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../components/admin/auth/LoginPage';
import { RegisterPage } from '../components/admin/auth/RegisterPage';
import { DashboardPage } from '../pages/admin/DashboardPage';
import { PostsPage } from '../pages/admin/PostsPage';
import { ReportsPage } from '../pages/admin/ReportsPage';
import { UsersPage } from '../pages/admin/UsersPage';
import { SettingsPage } from '../pages/admin/SettingsPage';
import { AdminLayout } from '../components/admin/AdminLayout';
import { PrivateRoute } from '../components/admin/routes/PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/admin',
    element: <PrivateRoute><AdminLayout /></PrivateRoute>,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'posts',
        element: <PostsPage />,
      },
      {
        path: 'reports',
        element: <ReportsPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: '/admin/login',
    element: <LoginPage />,
  },
  {
    path: '/admin/register',
    element: <RegisterPage />,
  },
]);