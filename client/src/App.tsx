import {
  createBrowserRouter,
  Link,
  Navigate,
  redirect,
  RouterProvider,
} from 'react-router-dom';

import AdminLayout from '@/layouts/crm/admin-layout';
import { api } from '@/api';
import Login from '@/pages/login-page';
import { store } from '@/store';
import { logout, setCredentials } from '@/slices/auth-slice';
import ErrorPage from '@/pages/error-page';
import SettingsPage from '@/pages/crm/settings/settings-page';
import { RequestsPage } from '@/pages/crm/requests/requests-page';
import ServicesPage from '@/pages/crm/settings/services/services-page';
import PrivateRoute from '@/components/private-route';
import RatesPage from './pages/crm/settings/rates/rates-page';
import CalendarRatesPage from './pages/crm/settings/calendar-rates/calendar-rates-page';
import MessagesPage from './pages/crm/messages/messages-page';
import MessagePage from './pages/crm/messages/message/message-page';

type ResponseData = {
  error?: string;
  user?: any;
};

async function verifyAuthLoader() {
  const token = localStorage.getItem('token');

  if (!token) {
    return redirect('/login');
  }

  try {
    const response = await api.get('/auth/verify');
    const data: ResponseData = response.data;

    if (data.error) {
      store.dispatch(logout());
    } else {
      store.dispatch(setCredentials({ user: data.user, token }));
    }

    return null;
  } catch (error) {
    store.dispatch(logout());
    return redirect('/login');
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className="flex flex-col gap-10">
        Hello world!
        <Link to="/login">Login</Link>
        <Link to="/crm">CRM</Link>
        <Link to="/account">Account</Link>
      </div>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    loader: () => {
      const token = localStorage.getItem('token');
      if (token) {
        return redirect('/');
      }
      return null;
    },
    element: <Login />,
  },
  {
    path: '/crm',
    loader: verifyAuthLoader,
    element: (
      <PrivateRoute allowedRoles={['admin']}>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/crm/requests" replace />, // Redirect to /crm/requests by default
      },
      {
        path: 'requests',
        element: <RequestsPage />,
      },
      {
        path: 'messages',
        element: <MessagesPage />,
        children: [
          {
            path: ':requestId',
            element: <MessagePage />,
          },
        ],
      },
      {
        path: 'settings',
        element: <SettingsPage />,
        children: [
          {
            path: 'services',
            element: <ServicesPage />,
          },
          {
            path: 'packing',
            element: <div>packing</div>,
          },
          {
            path: 'trucks',
            element: <div>trucks</div>,
          },
          {
            path: 'rates',
            element: <RatesPage />,
          },
          {
            path: 'calendar-rates',
            element: <CalendarRatesPage />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <RouterProvider
      router={router}
      fallbackElement={
        <div className="flex h-screen w-full items-center justify-center">
          <p>Global Loading...</p>
        </div>
      }
    />
  );
}
